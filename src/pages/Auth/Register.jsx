import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="w-full max-w-md p-8 bg-[#0F0F0F] rounded-2xl shadow-xl">
      <h2 className="text-white text-2xl font-bold mb-2 text-center">Sedap<span className="text-green-500">.</span></h2>
      <p className="text-center text-white mb-6 font-medium">Create a New Admin Account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white text-sm mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-lg bg-[#1c1c1c] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-white text-sm mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg bg-[#1c1c1c] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-white text-sm mb-1">Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-2 rounded-lg bg-[#1c1c1c] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Register
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Back to Login
        </button>
      </form>

      <p className="text-center text-gray-500 text-xs mt-6">
        © 2025 Sedap Restaurant Admin Dashboard. All rights reserved.
      </p>
    </div>
  );
}
