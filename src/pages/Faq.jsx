import { useState, useEffect } from "react";
import { FaqAPI } from "../services/faqAPI"; // Import dari services
import Banner from "../components/Banner";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Ambil data dari API saat komponen mount
  useEffect(() => {
    async function loadFaqs() {
      try {
        const data = await FaqAPI.fetchAll();
        setFaqs(data);
      } catch (error) {
        console.error("Gagal mengambil data FAQ:", error);
      }
    }

    loadFaqs();
  }, []);

  const toggleAnswer = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const filteredFaqs = faqs.filter(item =>
    item.pertanyaan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFaqs = filteredFaqs.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOpenIndex(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Banner
        title="PERTANYAAN UMUM"
        description="Temukan jawaban atas pertanyaan yang sering ditanyakan oleh pelanggan kami."
      />

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Kiri: FAQ */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>

          <input
            type="text"
            placeholder="Cari pertanyaan di sini"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
              setOpenIndex(null);
            }}
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-full shadow-sm focus:outline-none"
          />

          
         
        <div>
  {currentFaqs.length > 0 ? (
    currentFaqs.map((item, index) => (
      <div
        key={item.id || index}
        className="collapse collapse-plus bg-base-100 border border-base-300 mb-4 rounded-xl"
      >
        <input
          type="radio"
          name="faq-accordion"
          checked={openIndex === index}
          onChange={() => toggleAnswer(index)}
        />
        <div className="collapse-title font-semibold text-base text-gray-800">
          {item.pertanyaan}
        </div>
        <div className="collapse-content text-sm text-gray-700">
          {item.jawaban}
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">Tidak ditemukan pertanyaan yang cocok.</p>
  )}
</div>


          {/* Pagination */}
          {filteredFaqs.length > itemsPerPage && (
            <div className="flex gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 rounded-full border text-sm ${currentPage === i + 1
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-600 border-gray-300"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Kanan: Gambar */}
        <div className="flex justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/015/877/238/non_2x/faq-speech-bubble-icon-in-flat-style-question-illustration-on-white-isolated-background-communication-sign-business-concept-vector.jpg"
            alt="FAQ Ilustrasi"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
