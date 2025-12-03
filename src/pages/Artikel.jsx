import { useState } from "react";
import artikelData from "./artikels.json";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";


export default function Artikel() {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKategori, setSelectedKategori] = useState("Semua");

  const kategoriList = ["Semua", ...new Set(artikelData.map(item => item.kategori))];

  const filteredArticles =
    selectedKategori === "Semua"
      ? artikelData
      : artikelData.filter(item => item.kategori === selectedKategori);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleKategoriChange = (kategori) => {
    setSelectedKategori(kategori);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <Banner
        title="DAFTAR ARTIKEL"
        description="Kami menyediakan berbagai informasi menarik dan bermanfaat seputar mobil dan perjalanan Anda."
      />

      {/* Filter Kategori */}
      <div className="max-w-6xl mx-auto px-4 mt-10 mb-6">
        <div className="flex flex-wrap gap-3 justify-start">
          {kategoriList.map((kategori, index) => (
            <button
              key={index}
              onClick={() => handleKategoriChange(kategori)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 
                ${
                  selectedKategori === kategori
                    ? "bg-green-600 text-white shadow-md scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"
                }`}
            >
              {kategori}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar Artikel */}
      <div className="max-w-6xl mx-auto py-6 px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArticles.map(article => (
          <div
            key={article.id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={article.gambar}
              alt={article.judul}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            {/* Kategori Badge */}
            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
              {article.kategori}
            </span>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {article.judul}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(article.tanggal).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-700 text-sm mb-4">{article.kutipan}</p>
            <Link to={`/artikel/${article.id}`} className="text-green-600 hover:underline font-medium text-sm">
              Baca Selengkapnya
            </Link>
          </div>
        ))}
      </div>

      {/* Navigasi Halaman */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10 pb-20">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="bg-green-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            &larr; Sebelumnya
          </button>
          <span className="text-gray-700 font-semibold">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="bg-green-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            Selanjutnya &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
