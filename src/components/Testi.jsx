import { useState } from "react";
import testimoniData from "../pages/testimoni.json";

export default function Testimoni() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // misal tampil 4 testimoni per halaman

  // Fungsi render bintang rating lengkap dengan path SVG yang benar
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={"full-" + i}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.455a1 1 0 00-1.176 0l-3.388 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.037 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      );
    }

    if (halfStar) {
      stars.push(
        <svg
          key="half"
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2.927c-.3-.921-1.603-.921-1.902 0L6.812 6.893a1 1 0 01-.95.69H1.684c-.968 0-1.371 1.24-.588 1.81l3.388 2.455a1 1 0 01.364 1.118l-1.286 3.966c-.3.921.755 1.688 1.54 1.118l3.388-2.455a1 1 0 011.176 0l.634.46V2.927z" />
        </svg>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={"empty-" + i}
          className="w-5 h-5 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.388-2.455a1 1 0 00-1.176 0l-3.388 2.455c-.784.57-1.838-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.037 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
        </svg>
      );
    }

    return stars;
  };

  // Pagination logic
  const totalPages = Math.ceil(testimoniData.length / itemsPerPage);

  const pagedData = testimoniData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Animasi sederhana saat ganti halaman (fade in)
  const [fade, setFade] = useState(true);
  const handlePageChange = (page) => {
    setFade(false);
    setTimeout(() => {
      setCurrentPage(page);
      setFade(true);
    }, 200);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
        Apa Kata Mereka?
      </h2>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
        {pagedData.map((item, index) => (
          <div
            key={index}
            className="relative bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6 pt-10"
          >
            <p className="text-gray-700 italic mb-4">“{item.pesan}”</p>

            <div className="flex items-center gap-1 mb-6">
              {renderStars(item.rating)}
              <span className="text-sm text-gray-600 ml-2">
                {item.rating.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-4 absolute -top-6 left-6">
              <img
                src={item.foto}
                alt={item.nama}
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
              />
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">{item.nama}</h4>
              <p className="text-sm text-gray-500">{item.jabatan}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 space-x-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-md border ${
              currentPage === i + 1
                ? "bg-green-400 text-white border-green-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"
            } transition`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
