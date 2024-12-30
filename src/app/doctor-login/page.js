"use client";
// pages/login-doctor.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/login-doctor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      // Successful login, redirect to doctor profile page
      const doctorId = result.redirectTo.split('/').pop(); // Extract ID from the redirect URL
      router.push(`/doctor/${doctorId}`); // Redirect to the specific doctor profile page
    } else {
      // Show error message if login fails
      setError(result.error || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/doctor-register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;