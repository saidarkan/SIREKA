import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const errorInfo = {
  400: { title: "Permintaan Tidak Valid", message: "Server tidak dapat memproses permintaan Anda.", icon: "❗" },
  401: { title: "Tidak Diotorisasi", message: "Anda harus login untuk mengakses halaman ini.", icon: "🔐" },
  403: { title: "Akses Ditolak", message: "Anda tidak memiliki izin untuk mengakses halaman ini.", icon: "⛔" },
  404: { title: "Halaman Tidak Ditemukan", message: "Maaf, halaman yang Anda cari tidak ditemukan.", icon: "🔍" },
  500: { title: "Kesalahan Server", message: "Terjadi kesalahan internal pada server.", icon: "💥" },
};

export default function ErrorPage() {
  const { errorCode } = useParams();
  const code = parseInt(errorCode) || 404;
  const error = errorInfo[code] || {
    title: "Terjadi Kesalahan",
    message: "Kesalahan yang tidak diketahui telah terjadi.",
    icon: "⚠️",
  };

  const [quote, setQuote] = useState("");

  useEffect(() => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => setQuote(response.data.slip.advice))
      .catch((error) => {
        console.error("Gagal mengambil quote:", error);
        setQuote("Tetap semangat meskipun ada kesalahan.");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white relative overflow-hidden">
      {/* Gradient latar blur */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ opacity: [0.07, 0.1, 0.07], scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 12 }}
      >
        <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] bg-green-500 opacity-10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[60vw] h-[60vw] bg-purple-500 opacity-10 rounded-full blur-[120px]" />
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-[9rem] font-extrabold text-green-500 tracking-widest drop-shadow-xl"
          animate={{ rotate: [0, 1.5, -1.5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {code}
        </motion.h1>

        <div className="text-5xl mb-3">{error.icon}</div>

        <h2 className="text-3xl font-bold mb-2">{error.title}</h2>
        <p className="text-gray-400 mb-6 text-lg max-w-md mx-auto">{error.message}</p>

        <motion.p
          className="text-sm italic text-gray-300 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          “{quote}”
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="inline-block bg-green-500 text-black px-6 py-3 rounded-full font-semibold text-base shadow-md hover:bg-green-600 transition"
          >
            ← Kembali ke Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
