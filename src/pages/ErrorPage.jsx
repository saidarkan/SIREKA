// src/components/ErrorPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ kode, deskripsi, to, gambar }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${gambar})`, // Menggunakan gambar yang diterima dari props
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center ">
        <h1 className="text-9xl font-bold animate__animated animate__fadeIn text-purple-600">
          {kode}
        </h1>
        <p className="text-2xl mt-4 text-gray-700 animate__animated animate__fadeIn animate__delay-1s">
          {deskripsi}
        </p>
        <div className="mt-6">
          <Link
            to={to}
            className="inline-block px-8 py-4 text-lg font-semibold text-violet-600 bg-white rounded-full shadow-lg transform transition-all hover:scale-110 hover:bg-violet-600 hover:text-white hover:shadow-2xl duration-300"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
