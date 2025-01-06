"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [appointments, setAppointments] = useState([]);

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

  const fetchAppointments = async () => {
    const response = await fetch('/api/get-appointments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    } else {
      console.error('Failed to fetch appointments');
    }
  };

  useEffect(() => {
    if (activeSection === 'myAppointments') {
      fetchAppointments();
    }
  }, [activeSection]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div style={{
        marginBottom: "10px",
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
          width: '220px',
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
                    onClick={() => setActiveSection('profile')}
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
                    onClick={() => router.push('/doctor-appointment')}
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
                    onClick={() => setActiveSection('myAppointments')}
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
        {/* Bottom-left Chat Icon */}
<div>
    <Link href="/chat-login" style={{
        position: 'fixed',
        bottom: '20px',
        left: '320px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#2b6cb0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        color: 'white',
        fontSize: '24px',
      }}>
        <FontAwesomeIcon icon={faComments} />
      </Link>
</div>

        {/* Main Content */}
        <div style={{ flex: '1', padding: '24px', backgroundColor: '#fff' }}>
          {activeSection === 'profile' && (
            <div style={{ fontSize: "20px", color: "#34495e" }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
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
            <h3 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '20px' }}>My Appointments</h3>
            {appointments.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <thead>
                  <tr style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
                    <th style={{ padding: '10px', textAlign: 'center', fontSize: '16px' }}>Doctor Name</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontSize: '16px' }}>Doctor Email</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontSize: '16px' }}>Phone Number</th>
                    
                    <th style={{ padding: '10px', textAlign: 'center', fontSize: '16px' }}>Date</th>
                    <th style={{ padding: '10px', textAlign: 'center', fontSize: '16px' }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{appointment.doctorName}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{appointment.doctorEmail}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{appointment.doctorphonenumber}</td>
                      
                      <td style={{ padding: '10px', textAlign: 'center' }}>{appointment.appointment_date}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{appointment.appointment_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ padding: '50px', textAlign: 'center', color: '#f44336', fontSize: '18px' }}>No appointments found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  </>
);
}

export default Profile;