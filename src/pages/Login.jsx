import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // <-- Tambahkan ini

  // Data user hardcoded
  const users = [
    { username: "admin", password: "admin123" },
    { username: "user", password: "user123" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek apakah username & password cocok
    const userFound = users.find(
      (user) => user.username === email && user.password === password
    );

    if (userFound) {
      // Login sukses → arahkan ke dashboardadmin
      navigate("/dashboard");
    } else {
      alert("Login gagal. Username atau password salah.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Kiri - Form Login */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Signin</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Signin
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">or signin with</div>
          <div className="flex justify-center mt-4 gap-4">
            <FaFacebook className="text-blue-600 text-xl cursor-pointer" />
            <FaGoogle className="text-red-500 text-xl cursor-pointer" />
            <FaLinkedin className="text-blue-500 text-xl cursor-pointer" />
          </div>
        </div>

        {/* Kanan - Welcome */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-green-500 to-green-600 text-white p-10">
          <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
          <p className="text-sm text-center">
            We are so happy to have you here. It's great to see you again. 
            We hope you had a safe and enjoyable time away.
          </p>
          <Link to="/register" className="mt-6 px-6 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-green-600 transition">
            No account yet? Signup.
          </Link>
        </div>

      </div>
    </div>
  );
}
