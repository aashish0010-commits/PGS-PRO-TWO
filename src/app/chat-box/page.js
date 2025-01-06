"use client";
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebaseConfig"; // Assuming you still use Firebase for authentication
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faUsers,
  faUserPlus,
  faPaperclip,
  faSignOutAlt,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [users, setUsers] = useState([]); // Registered users
  const [showSidebar, setShowSidebar] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [chatList, setChatList] = useState([]); // List of selected chat users

  // Toggle Dark Mode
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token if necessary and set user
      setUser({ email: "user@example.com" }); // Replace this with decoded token info if required
    }
  }, []);
  
  // Fetch All Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors'); // Fetch from new API endpoint
        const data = await response.json();
        setUsers(data.doctors); // Set users to the fetched doctors
        setFilteredUsers(data.doctors); // Initially show all doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Search Doctors
  useEffect(() => {
    const fetchFilteredDoctors = async () => {
      if (!searchQuery) {
        setFilteredUsers(users);
        return;
      }

      const filtered = users.filter(user =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    };

    fetchFilteredDoctors();
  }, [searchQuery, users]);

  // Fetch Messages for Selected Chat
  const fetchMessages = async (recipientEmail) => {
    try {
      const response = await fetch(`/api/messages/${recipientEmail}`); // Assume API endpoint to get messages
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send Message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && selectedChat) {
      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: message,
            user: user?.email,
            recipient: selectedChat,
          }),
        });
        setMessage("");
        fetchMessages(selectedChat); // Fetch new messages after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Attach File
  const handleSendFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', { // Assume API endpoint to upload file
          method: 'POST',
          body: formData,
        });
        const data = await response.json();

        await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: "",
            user: user?.email,
            fileUrl: data.fileUrl, // Assume the API returns the uploaded file URL
            recipient: selectedChat,
          }),
        });
        setFile(null);
        fetchMessages(selectedChat); // Fetch new messages after sending
      } catch (error) {
        console.error("Error sending file:", error);
      }
    }
  };

  const handleFileAttach = (event) => setFile(event.target.files[0]);
  const handleToggleSidebar = () => setShowSidebar(!showSidebar);

  // Select Doctor from Sidebar
  const handleSelectUser = (selectedUser) => {
    setChatList((prevChatList) => {
      if (prevChatList.find((chatUser) => chatUser.email === selectedUser.email)) {
        return prevChatList; // If already exists, do not add again
      }
      return [...prevChatList, selectedUser]; // Add new user to chat list
    });
    setSelectedChat(selectedUser.email); // Set selected chat
    fetchMessages(selectedUser.email); // Load messages for the selected user
    setShowSidebar(false); // Close the sidebar after selecting a user
  };

  return (
    <div style={styles.container}>
      {/* Sidebar Left */}
      <div style={styles.sidebarleft}>
        <div style={styles.iconContainer}>
          <button style={styles.iconButton} title="Conversations">
            <FontAwesomeIcon icon={faComments} />
          </button>
          <button
            style={styles.iconButton}
            title="Users"
            onClick={handleToggleSidebar}
          >
            <FontAwesomeIcon icon={faUsers} />
          </button>
          <a 
            href="/" 
            style={styles.iconButton} 
            title="Sign Out"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </a>
        </div>
        <div style={styles.modeToggleContainer}>
          <button
            style={styles.modeToggleButton}
            title="Toggle Dark/Light Mode"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>
        </div>
        <div style={styles.profileContainer}>
          <img
            src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
            alt="Profile"
            style={styles.profilePicture}
          />
        </div>
      </div>

      <div
        style={{
          ...styles.userSidebar,
          transform: showSidebar ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <h2 style={styles.sidebarTitle}>People</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />

        {/* Doctor List */}
        {filteredUsers.map((user) => (
          <div key={user.email} style={styles.userItem} onClick={() => handleSelectUser(user)}>
            <img
              src="/default-profile.png" // Fallback for missing photo
              alt={`${user.fullName}`}
              style={styles.userImage}
            />
            <div>
              <strong>
                {user.fullName}
              </strong>
              <p>{user.email}</p>
            </div>
          </div>
        ))}

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <p style={{ textAlign: "center", color: "#888" }}>No users found</p>
        )}
      </div>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span>Messages</span>
          <FontAwesomeIcon
            icon={faUserPlus}
            style={styles.usersIcon}
            title="Users"
          />
        </div>
        <div style={styles.chatList}>
          {chatList.length > 0 ? (
            chatList.map((chatUser) => (
              <div
                key={chatUser.email}
                style={styles.chatItem}
                onClick={() => handleSelectUser(chatUser)}
              >
                <span style={styles.chatInitial}>{chatUser.fullName.charAt(0)}</span>
                <span>{chatUser.fullName}</span>
              </div>
            ))
          ) : (
            <p>No available chats</p>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div style={styles.chatArea}>
        {selectedChat ? (
          <div style={styles.chatContainer}>
            <div style={styles.chatHeader}>
              <img
                src="profile-pic-url" // Replace with actual profile image URL
                alt="User"
                style={styles.profileImage}
              />
              <h3 style={styles.chatName}>{selectedChat}</h3>
              <span style={styles.status}>Offline</span>
            </div>
            <div style={styles.messageContainer}>
              {messages.map((msg, index) => {
                const isCurrentUser = msg.user === user?.email;
                return (
                  <div key={index} style={{ ...styles.message, textAlign: isCurrentUser ? 'right' : 'left' }}>
                    {!isCurrentUser && (
                      <strong>{msg.user}</strong>
                    )} 
                    {isCurrentUser ? "You" : ""}: {msg.text}
                    {msg.fileUrl && (
                      <div>
                        <a
                          href={msg.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View File
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={styles.inputArea}>
              <input
                type="file"
                onChange={handleFileAttach}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput" style={styles.attachButton}>
                <FontAwesomeIcon style={styles.icon} icon={faPaperclip} />
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message"
                style={styles.input}
              />
              <button onClick={handleSendMessage} style={styles.sendButton}>
                <span>➤</span>
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.noChatSelected}>
            Select a chat or start a new conversation
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  sidebarleft: {
    width: "5rem",
    backgroundColor: "#333",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  iconButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  modeToggleContainer: {
    marginTop: "auto",
  },
  modeToggleButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  profileContainer: {
    paddingTop: "1rem",
  },
  profilePicture: {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    objectFit: "cover",
  },
  userSidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "25rem",
    height: "100%",
    backgroundColor: "#fff",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)",
    padding: "1rem",
    transition: "transform 0.3s ease-in-out",
    zIndex: 10,
  },
  sidebarTitle: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 0",
    borderBottom: "1px solid #eee",
  },
  sidebar: {
    width: "27rem",
    backgroundColor: "#f5f5f5",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    borderRight: "1px solid #ddd",
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "30px",
    fontWeight: "bold",
    margin: "4px",
  },
  chatList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  chatItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  chatInitial: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
  },
  usersIcon: {
    fontSize: "24px",
    color: "#007bff",
    cursor: "pointer",
  },
  chatArea: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f7f9fc',
    padding: '10px',
    width: '100%',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    flex: 1,
    overflow: 'hidden',
  },
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #e6e6e6',
  },
  profileImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  chatName: {
    flex: 1,
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
  },
  status: {
    fontSize: '12px',
    color: '#888',
  },
  messageContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '15px',
  },
  message: {
    marginBottom: '10px',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  inputArea: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #e6e6e6',
    padding: '10px',
  },
  attachButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#e6e6e6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#555',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
  },
  input: {
    flex: 1,
    border: 'none',
    borderRadius: '20px',
    padding: '10px 15px',
    fontSize: '14px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginRight: '10px',
  },
  sendButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#0084ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
  },
  noChatSelected: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#888',
    marginTop: '20px',
  },
  dropdown: {
    position: "absolute",
    top: "60px",
    left: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    zIndex: 10,
    maxHeight: "200px",
    overflowY: "auto",
    width: "200px",
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  userImage: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    marginRight: "10px",
  },
};

export default ChatPage;