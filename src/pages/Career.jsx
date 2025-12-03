import React, { useState, useEffect } from "react";
import { LowonganAPI } from "../services/lowonganAPI.js";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";

export default function CareerPage() {
  const [filter, setFilter] = useState("Semua");
  const [jobVacancies, setJobVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await LowonganAPI.fetchAll();
        setJobVacancies(data);
      } catch (error) {
        console.error("Gagal memuat data lowongan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const categories = ["Semua", ...new Set(jobVacancies.map((job) => job.category || "Umum"))];

  const filteredJobs =
    filter === "Semua"
      ? jobVacancies
      : jobVacancies.filter((job) => (job.category || "Umum") === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner
        title="DAFTAR LOWONGAN PEKERJAAN"
        description="Temukan berbagai kesempatan karir menarik di Bali 88 Trans."
      />

      <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filter kategori */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition
                ${
                  filter === cat
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-green-600 border-green-600 hover:bg-green-50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Memuat data lowongan...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Belum ada lowongan untuk kategori <strong>{filter}</strong>.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
              >
                <header>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">{job.judul}</h2>
                  <p className="text-green-600 font-medium mb-1">{job.lokasi}</p>
                  {job.type && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold mb-3">
                      {job.type}
                    </span>
                  )}
                </header>

                <p className="text-gray-700 mb-6 flex-grow">{job.deskripsi}</p>

                <footer className="flex justify-between items-center mt-auto">
                  {job.deadline && (
                    <p className="text-sm text-gray-500 italic">
                      Batas lamaran: {new Date(job.deadline).toLocaleDateString("id-ID")}
                    </p>
                  )}

                  <Link
                    to={`/career/${job.id}`}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Lamar Sekarang
                  </Link>
                </footer>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
