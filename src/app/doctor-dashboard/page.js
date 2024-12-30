'use client';  
import { useEffect, useState } from "react";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the API on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('/api/appointments/getAppointments');
      const data = await response.json();

      // Ensure the data is an array before setting the state
      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        console.error("Data is not an array:", data);
      }
    };

    fetchAppointments();
  }, []);

  // Handle Edit functionality (For future implementation)
  const handleEdit = (id) => {
    alert(`Edit patient with ID: ${id}`);
    // Here you can implement the logic to edit the patient details
  };

  // Handle Delete functionality
  const handleDelete = async (id) => {
    const response = await fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setAppointments((prevAppointments) => 
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } else {
      alert("Failed to delete the appointment");
    }
  };

  // Handle Manage functionality (For future implementation)
  const handleManage = (id) => {
    alert(`Manage patient with ID: ${id}`);
    // Here you can implement the logic to manage the patient (view more details, etc.)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="bg-blue-900 text-white w-64 p-6 hidden lg:block">
        <h2 className="text-2xl font-semibold text-left mb-8">Doctor Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">Dashboard</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">Appointments</a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg hover:text-gray-300">Patients</a>
            </li>
            <li>
              <a href="#" className="text-lg hover:text-gray-300">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-300">
            <div>
              <h3 className="text-xl font-semibold">Patient Appointments</h3>
              <p className="text-gray-500">Manage all your patient appointments here.</p>
            </div>
            <img
              src="http://localhost:3000/_next/image?url=%2Fimages%2Ffront.png&w=256&q=75"
              alt="Logo"
              className="h-12 sm:h-16"
            />
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="py-2 px-6 text-left">Full Name</th>
                    <th className="py-2 px-6 text-left">Email</th>
                    <th className="py-2 px-6 text-left">Phone Number</th>
                    <th className="py-2 px-6 text-left">Disease</th>
                    <th className="py-2 px-6 text-left">Doctor</th>
                    <th className="py-2 px-6 text-left">Appointment Date</th>
                    <th className="py-2 px-6 text-left">Appointment Time</th>
                    <th className="py-2 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-6">{appointment.full_name}</td>
                        <td className="py-2 px-6">{appointment.email}</td>
                        <td className="py-2 px-6">{appointment.phone_number}</td>
                        <td className="py-2 px-6">{appointment.disease}</td>
                        <td className="py-2 px-6">{appointment.doctor}</td>
                        <td className="py-2 px-6">{appointment.appointment_date}</td>
                        <td className="py-2 px-6">{appointment.appointment_time}</td>
                        <td className="py-2 px-6 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                          <button
                            onClick={() => handleEdit(appointment.id)}
                            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition duration-200 w-full sm:w-auto"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(appointment.id)}
                            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200 w-full sm:w-auto"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleManage(appointment.id)}
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-gray-500">No appointments available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
