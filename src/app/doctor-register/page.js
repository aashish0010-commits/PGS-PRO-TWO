"use client";
// pages/register-doctor.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    phoneNumber: '',
    nmcNumber: '',
    citizenshipNumber: '',
    speciality: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the form data to check if email and password are being captured
    console.log('Form Data:', formData);
  
    // Check if the email and password are not empty
    if (!formData.email || !formData.password) {
      alert('Email and password are required!');
      return;
    }
  
    // Check if email is in valid format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    const response = await fetch('/api/register-doctor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  
    const result = await response.json();
  
    if (response.ok) {
      // Set success message
      setSuccessMessage('Registration successful! You can now log in.');
    } else {
      alert(result.error || 'Registration failed');
    }
  };
  
  return (
    <>
       <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
  type="email"
  id="email"
  name="email"  // Ensure the name attribute matches the formData keys
  placeholder="Enter your email"
  value={formData.email}
  onChange={handleChange}
  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  required
/>
          </div>
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* NMC Registration Number */}
          <div>
            <label
              htmlFor="nmcNumber"
              className="block text-sm font-medium text-gray-700"
            >
              NMC Registration Number
            </label>
            <input
              type="text"
              id="nmcNumber"
              name="nmcNumber"
              placeholder="Enter your NMC registration number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Citizenship Number */}
          <div>
            <label
              htmlFor="citizenshipNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Citizenship Number
            </label>
            <input
              type="text"
              id="citizenshipNumber"
              name="citizenshipNumber"
              placeholder="Enter your citizenship number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Speciality */}
          <div>
            <label
              htmlFor="speciality"
              className="block text-sm font-medium text-gray-700"
            >
              Speciality
            </label>
            <input
              type="text"
              id="speciality"
              name="speciality"
              placeholder="Enter your speciality"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
  type="password"
  id="password"
  name="password"  // Ensure the name attribute matches the formData keys
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  required
/>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

{/* Conditionally render success message */}
{successMessage && (
          <div className="mt-4 text-center text-green-600">
            {successMessage}
          </div>
        )}

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/doctor-login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default page