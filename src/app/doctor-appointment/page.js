'use client';
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+977',
    disease: '',
    doctor: '',
    date: '',
    time: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [doctors, setDoctors] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prevState) => ({
          ...prevState,
          fullName: `${data.user.first_name} ${data.user.last_name}`,
          email: data.user.email
        }));
      } else {
        alert('Error fetching profile data');
        // Redirect to login if profile fetch fails
        window.location.href = '/patient-login';
      }
    };

    fetchProfile();

    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/get-doctors'); 
        const data = await response.json();
        if (response.ok) {
          setDoctors(data);
        } else {
          console.error('Failed to fetch doctors:', data.message);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setResponseMessage('Appointment booked successfully!');
      } else {
        setResponseMessage(data.message || 'Error submitting appointment.');
      }
    } catch (error) {
      setResponseMessage('Error submitting appointment.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12 flex-col">
      <div className="max-w-6xl w-full bg-[#1b557d] bg-opacity-80 rounded-3xl shadow-xl p-10 mb-16">
        <h2 className="text-4xl font-extrabold text-center text-white mb-10 tracking-tight">
          Book an Appointment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-lg font-medium text-white">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="mt-1 block w-full p-4 border-gray-300 bg-[#375770] rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-white">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full p-4 border-gray-300 bg-[#375770] rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-white">Phone Number</label>
              <div className="flex">
                <select
                  id="countryCode"
                  name="countryCode"
                  className="p-4 border-gray-300 bg-[#375770] rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.countryCode}
                  onChange={handleChange}
                >
                  <option value="+977">+977 (Nepal)</option>
                  <option value="+91">+91 (India)</option>
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-4 border-gray-300 bg-[#375770] rounded-r-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="disease" className="block text-lg font-medium text-white">Select Disease</label>
              <select
                id="disease"
                name="disease"
                className="mt-1 block w-full p-4 border-gray-300 bg-[#375770] rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.disease}
                onChange={handleChange}
                required
              >
                <option value="">Select a disease</option>
                <option value="flu">Flu</option>
                <option value="cold">Common Cold</option>
                <option value="cough">Cough</option>
                <option value="headache">Headache</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="doctor" className="block text-lg font-medium text-white">Select Doctor</label>
              {loading ? (
                <p className="mt-1 text-indigo-500">Loading doctors...</p>
              ) : (
                <select
                  id="doctor"
                  name="doctor"
                  className="mt-1 block w-full p-4 border-gray-300 bg-[#375770] rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                >
                  <option value="" className="bg-white text-black">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id} className="bg-white text-black">{doctor.fullName}</option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label htmlFor="date" className="block text-lg font-medium text-white">Appointment Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className="mt-1 block w-full p-4 border-gray-300 bg-[#375770] rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="time" className="block text-lg font-medium text-white">Appointment Time</label>
              <input
                type="time"
                id="time"
                name="time"
                className="mt-1 block w-full p-4 border-gray-300 bg-[#375770] rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-white">Message</label>
              <textarea
                id="message"
                name="message"
                className="mt-1 block w-full p-4 border-gray-300 bg-[#375770] rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Any special requests?"
                value={formData.message}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 text-lg font-bold text-white bg-[#FF9900] rounded-lg shadow-lg hover:from-indigo-700 hover:to-indigo-600 focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
          >
            Book Appointment
          </button>
          <p className='text-center text-white'>&copy; 2024 Smart Care Connect. All rights reserved.</p>
        </form>
        {responseMessage && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg text-center">
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
