"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('profile'); // Manage the active section

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        alert('Error fetching profile data');
        router.push('/patient-login');
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  const handleBookAppointment = () => {
    const fullName = `${user.first_name} ${user.last_name}`;
    router.push({
      pathname: '/doctor-appointment',
      query: {
        fullName: fullName,
        email: user.email,
      },
    });
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
    <div style={{
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
  }}>
    <img src="../images/front-2.png" alt="Hospital Logo" style={{ width: '15%', marginBottom: '30px' }} />

    </div>
      
      <div style={{ display: 'flex', minHeight: '80vh', backgroundColor: '#f4f7fb' }}>
        {/* Sidebar */}
        <div style={{
          width: '250px',
          backgroundColor: '#2b6cb0',
          color: 'white',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '75vh',
        }}>
          <div>
            <nav>
              <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                <li>
                  <Link
                    href="#"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      padding: '12px',
                      display: 'block',
                      borderRadius: '8px',
                      backgroundColor: '#2b6cb0',
                      marginBottom: '10px',
                      fontFamily: 'Roboto',
                      transition: 'background-color 0.3s',
                    }}
                    onClick={() => handleSectionChange('profile')}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#4a90e2')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#2b6cb0')}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      padding: '12px',
                      display: 'block',
                      borderRadius: '8px',
                      backgroundColor: '#2b6cb0',
                      marginBottom: '10px',
                      fontFamily: 'Roboto',
                      transition: 'background-color 0.3s',
                    }}
                    onClick={handleBookAppointment} 
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#4a90e2')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#2b6cb0')}
                  >
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      padding: '12px',
                      display: 'block',
                      borderRadius: '8px',
                      backgroundColor: '#2b6cb0',
                      marginBottom: '10px',
                      fontFamily: 'Roboto',
                      transition: 'background-color 0.3s',
                    }}
                    onClick={() => handleSectionChange('myAppointments')}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#4a90e2')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#2b6cb0')}
                  >
                    My Appointments
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#e53e3e',
              color: 'white',
              borderRadius: '8px',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#c53030')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#e53e3e')}
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div style={{ flex: '1', padding: '24px', backgroundColor: '#fff' }}>
          {activeSection === 'profile' && (
            <div style={{
                fontSize: "20px",
                color: "#34495e",
              }}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px'}}>
                <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', marginBottom: '24px', fontFamily: 'Roboto' }}>
                <span style={{ color: '#2b6cb0', fontWeight: 'bold' }}>Welcome,</span> Mr. {user.first_name}
              </h2>
              </div>

              <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden' }}>
                    <img
                      src={user.profile_image || 'https://th.bing.com/th?id=OIP.MNYMRopweKA9axhd73z_GwHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'}
                      alt="Profile"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                </div>
              {user && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Profile Image */}

                  {/* Profile Table */}
                  <div style={{ flex: 1, marginLeft: '24px' }}>
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        fontFamily: 'Roboto',
                        borderRadius: '10px',
                        overflow: 'hidden',
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: '#edf2f7' }}>
                          <th style={{ padding: '12px', textAlign: 'left' }}>Field</th>
                          <th style={{ padding: '12px', textAlign: 'left' }}>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '#fff' }}>
                          <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Full Name:</td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{`${user.first_name} ${user.last_name}`}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#f9f9f9' }}>
                          <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Email:</td>
                          <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === 'myAppointments' && (
            <div>
              {/* Replace this with actual appointments content */}
              <h3>List ofAppointments</h3>
              {/* Appointment content goes here */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
