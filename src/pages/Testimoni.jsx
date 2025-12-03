import { useEffect, useState } from "react";
import { TestimoniAPI } from "../services/testimoniAPI";
import Banner from "../components/Banner";

export default function Testimoni() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fade, setFade] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const itemsPerPage = 4;

  useEffect(() => {
    const getTestimonies = async () => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const result = await TestimoniAPI.fetchAll();
        if (result.length === 0) {
          setSuccess("Belum ada testimoni yang tersedia.");
        } else {
          setSuccess("Data testimoni berhasil dimuat.");
        }
        setData(result);
      } catch (err) {
        console.error("Gagal ambil testimoni:", err);
        setError("Terjadi kesalahan saat memuat testimoni.");
      } finally {
        setLoading(false);
      }
    };

    getTestimonies();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974..." />
        </svg>
      );
    }

    if (halfStar) {
      stars.push(
        <svg key="half" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974..." />
        </svg>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974..." />
        </svg>
      );
    }

    return stars;
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pagedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setFade(false);
    setTimeout(() => {
      setCurrentPage(page);
      setFade(true);
    }, 200);
  };

  return (
    <>
      <Banner
        title="TESTIMONI PELANGGAN"
        description="Kami menyediakan berbagai pilihan mobil berkualitas tinggi yang sesuai untuk kebutuhan perjalanan pribadi, bisnis, dan keluarga Anda."
      />

      <div className="max-w-6xl mx-auto px-6 py-12 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Apa Kata Mereka?</h2>

        {/* Pesan loading/error/sukses */}
        {loading && (
          <div className="text-center text-gray-600 py-8">Memuat testimoni...</div>
        )}
        {error && (
          <div className="text-center text-red-600 py-4 border border-red-200 bg-red-50 rounded-md mb-6">{error}</div>
        )}
        {success && !loading && (
          <div className="text-center text-green-600 py-4 border border-green-200 bg-green-50 rounded-md mb-6">{success}</div>
        )}

        {/* Konten testimoni */}
        {!loading && !error && data.length > 0 && (
          <>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-300 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {pagedData.map((item, index) => (
                <div key={index} className="relative bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6 pt-10">
                  <p className="text-gray-700 italic mb-4">“{item.pesan}”</p>

                  <div className="flex items-center gap-1 mb-6">
                    {renderStars(item.rating)}
                    <span className="text-sm text-gray-600 ml-2">{parseFloat(item.rating).toFixed(1)}</span>
                  </div>

                  <div className="flex items-center gap-4 absolute -top-6 left-6">
                    <img
                      src={item.foto || "/default-profile.jpg"}
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

            {/* Pagination */}
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
          </>
        )}
      </div>
    </>
  );
}
