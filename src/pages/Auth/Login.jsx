import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi validasi login (dummy)
    const isValidUser = email === "admin@example.com" && password === "admin123";

    if (!isValidUser) {
      setError("Invalid credentials");
    } else {
      setError("");
      // Arahkan ke dashboard atau halaman lainnya
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-[#0F0F0F] rounded-2xl shadow-xl">
      <h2 className="text-white text-2xl font-bold mb-2 text-center">Sedap<span className="text-green-500">.</span></h2>
      <p className="text-center text-white mb-6 font-medium">Welcome Back 👋</p>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.257 3.099c.763-1.36 2.683-1.36 3.446 0l6.518 11.614c.75 1.338-.213 3.014-1.723 3.014H3.462c-1.51 0-2.473-1.676-1.723-3.014L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 7v4a1 1 0 001.993.117L11 11V7a1 1 0 00-1-1z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-white text-sm mb-1">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#1c1c1c] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-white text-sm mb-1">Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#1c1c1c] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Register
          </button>
        </div>
        <button
          type="button"
          onClick={() => navigate("/forgot")}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition duration-300"
        >
          Lupa Password
        </button>
      </form>

      <p className="text-center text-gray-500 text-xs mt-6">
        © 2025 Sedap Restaurant Admin Dashboard. All rights reserved.
      </p>
    </div>
  );
}
