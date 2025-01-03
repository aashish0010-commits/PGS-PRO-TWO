import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaPaperPlane, FaPaperclip, FaMicrophone } from "react-icons/fa";

const DoctorProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [activeSection, setActiveSection] = useState("Profile Overview"); // State to track active section
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");


  useEffect(() => {
    if (id) {
      const fetchDoctorProfile = async () => {
        try {
          const response = await fetch(`/api/get-doctor-profile?id=${id}`);
          const data = await response.json();
          if (response.ok) {
            setDoctor(data);
            await fetchPatients(data.id); // Fetch patients for this doctor
          } else {
            console.error("Error fetching doctor profile:", data.error);
          }
        } catch (error) {
          console.error("Error fetching doctor profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDoctorProfile();
    }
  }, [id]);

  const fetchPatients = async (doctorId) => {
    try {
      const response = await fetch(`/api/get-patients?doctorId=${doctorId}`);
      const data = await response.json();
      if (response.ok) {
        setPatients(data);
      } else {
        console.error("Error fetching patients:", data.error);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { type: "text", content: inputMessage }]);
      setInputMessage("");
    }
  };

  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([...messages, { type: "file", content: file.name }]);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!doctor) {
    return <div style={styles.notFound}>Doctor not found.</div>;
  }

  // Function to render the content based on the active section
  const renderSection = () => {
    switch (activeSection) {
      case "Profile Overview":
        return (
          <div style={styles.card}>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <strong>Email:</strong> {doctor.email}
              </div>
              <div style={styles.infoItem}>
                <strong>Phone:</strong> {doctor.phoneNumber}
              </div>
              <div style={styles.infoItem}>
                <strong>Speciality:</strong> {doctor.speciality}
              </div>
              <div style={styles.infoItem}>
                <strong>NMC Number:</strong> {doctor.nmcNumber}
              </div>
              <div style={styles.infoItem}>
                <strong>Citizenship Number:</strong> {doctor.citizenshipNumber}
              </div>
              <div style={styles.infoItem}>
                <strong>Address:</strong> {doctor.address}
              </div>
            </div>
          </div>
        );
      case "Patients":
        return (
          <div style={styles.patientsSection}>
            <h2 style={styles.patientsTitle}>Patients</h2>
            {patients.length > 0 ? (
              <table style={styles.patientTable}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.tableCell}>Full Name</th>
                    <th style={styles.tableCell}>Disease</th>
                    <th style={styles.tableCell}>Appointment Date</th>
                    <th style={styles.tableCell}>Appointment Time</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} style={styles.tableRow}>
                      <td style={styles.tableCellOne}>{patient.full_name}</td>
                      <td style={styles.tableCellOne}>{patient.disease}</td>
                      <td style={styles.tableCellOne}>{patient.appointment_date}</td>
                      <td style={styles.tableCellOne}>{patient.appointment_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={styles.notFound}>No patients found for this doctor.</p>
            )}
          </div>
        );
        case "Chat":
          return (
            <div style={styles.chatContainer}>
              <div style={styles.chatHeader}>Doctor-Patient Chat</div>
              <div style={styles.chatBody}>
                {messages.map((message, index) => (
                  <div key={index} style={styles.chatMessage}>
                    {message.type === "text" && <p style={styles.textMessage}>{message.content}</p>}
                    {message.type === "file" && (
                      <p style={styles.fileMessage}>
                        <strong>File:</strong> {message.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div style={styles.chatFooter}>
                <label style={styles.button}>
                  <FaPaperclip />
                  <input type="file" onChange={handleAttachment} hidden />
                </label>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  style={styles.input}
                />
                <button style={styles.button} onClick={handleSendMessage}>
                  <FaPaperPlane />
                </button>
                <button style={styles.button}>
                  <FaMicrophone />
                </button>
              </div>
            </div>
          );

      case "Settings":
        return <div style={styles.card}>Settings section content goes here.</div>;
      case "Logout":
        router.push("/");
        break;
      default:
        return <div style={styles.notFound}>Invalid section.</div>;
    }
  };

  return (
    <>
     <div style={styles.sidebarHeader}>
      <img
          src="../images/front-2.png"
          alt="img"
        />
        </div>
    <div style={styles.dashboardContainer}>
      <aside style={styles.sidebar}>
        
        <ul style={styles.sidebarMenu}>
          {["Profile Overview", "Patients", "Chat", "Settings", "Logout"].map((item) => (
            <li
              key={item}
              style={{
                ...styles.menuItem,
                backgroundColor: activeSection === item ? "#34495e" : "transparent",
              }}
              onClick={() => setActiveSection(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
      <main style={styles.mainContent}>
  {activeSection !== "Chat" && (
    <header style={styles.header}>
      <div style={styles.leftHeader}>
        <h1 style={styles.pageTitle}>
          <span style={styles.welcomeText}>Welcome,</span> Dr. {doctor.fullName}
        </h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "100px", height: "100px", overflow: "hidden", borderRadius: "50%" }}>
          <img
            src="https://th.bing.com/th/id/OIP.Z-jIioX1b136277SvqD10QHaHx?rs=1&pid=ImgDetMain"
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </header>
  )}
  {renderSection()}
</main>
    </div>
    </>
  );
};

const styles = {
  dashboardContainer: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f4f6f9",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    padding: "20px",
  },
  sidebarMenu: {
    listStyleType: "none",
    padding: "0",
  },
  menuItem: {
    fontSize: "16px",
    padding: "10px 0",
    cursor: "pointer",
    borderBottom: "1px solid #34495e",
  },
  mainContent: {
    flexGrow: "1",
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#34495e",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  infoItem: {
    fontSize: "16px",
    color: "#7f8c8d",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#ecf0f1",
  },
  loading: {
    fontSize: "20px",
    color: "#7f8c8d",
    textAlign: "center",
    marginTop: "50px",
  },
  notFound: {
    fontSize: "20px",
    color: "#e74c3c",
    textAlign: "center",
    marginTop: "50px",
  },
  welcomeText: {
    color: "#61a3f8",
  },
  patientsSection: {
    marginTop: "20px",
  },

  patientTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
  },
  tableRow: {
    "&:nth-child(even)": {
      backgroundColor: "#ecf0f1",
    },
  },
  tableCell: {
    border: "1px solid #bdc3c7",
    padding: "10px",
    textAlign: "left",
    fontSize: "14px",
    color: "#fff",
  },

  tableCellOne: {
    border: "1px solid #bdc3c7",
    padding: "10px",
    textAlign: "left",
    fontSize: "14px",
    color: "#34495e",
  },

  sidebarHeader: {
    backgroundColor: "#fff",
},
chatContainer: { display: "flex", flexDirection: "column", height: "80%" },
chatHeader: { 
  padding: "10px", 
  backgroundColor: "#34495e", 
  color: "white", 
  fontSize: "24px", // Adjust the size as needed
  textAlign: "center" 
},
chatBody: { flex: 1, padding: "10px", overflowY: "auto", backgroundColor: "#ecf0f1" },
chatMessage: { margin: "10px 0" },
textMessage: { padding: "10px", backgroundColor: "#3498db", color: "white", borderRadius: "5px" },
fileMessage: { padding: "10px", backgroundColor: "#e67e22", color: "white", borderRadius: "5px" },
chatFooter: { display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#bdc3c7" },
button: {
  backgroundColor: "#34495e",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
},
input: { flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #bdc3c7" },
};

export default DoctorProfile;