import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full max-w-md p-8 bg-[#0F0F0F] rounded-2xl shadow-xl">
      <h2 className="text-white text-2xl font-bold mb-2 text-center">Sedap<span className="text-green-500">.</span></h2>
      <p className="text-center text-white mb-6 font-medium">Forgot Password</p>

      {sent ? (
        <p className="text-green-500 text-center mb-4">Password reset link sent to your email.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-[#1c1c1c] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition duration-300"
          >
            Send Reset Link
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Back to Login
          </button>
        </form>
      )}

      <p className="text-center text-gray-500 text-xs mt-6">
        © 2025 Sedap Restaurant Admin Dashboard. All rights reserved.
      </p>
    </div>
  );
}
