import { useParams, useNavigate } from "react-router-dom";
import jobVacancies from "./lowongan.json";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";

export default function CareerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const found = jobVacancies.find((item) => String(item.id) === id);
    setJob(found);
  }, [id]);

  if (!job)
    return (
      <div className="max-w-4xl mx-auto mt-32 px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">Lowongan tidak ditemukan.</p>
        <button
          onClick={() => navigate("/career")}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Kembali ke Daftar
        </button>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Banner title={job.posisi} description={job.lokasi} />

      <div className="max-w-5xl mx-auto mt-24 px-4 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Konten utama */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Deskripsi Pekerjaan</h2>
          <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
            {job.deskripsi}
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4 text-green-700">Syarat Melamar</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {job.requirements && job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-10 mb-4 text-green-700">Ketentuan Tambahan</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Pelamar wajib mengisi formulir lamaran secara lengkap.</li>
            <li>Proses seleksi akan dilakukan secara bertahap oleh tim HR.</li>
            <li>Pelamar yang lolos seleksi akan dihubungi via email atau telepon.</li>
          </ul>
        </div>

        {/* Sidebar */}
        <aside className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-500 text-sm mb-2">Kategori:</p>
          <p className="font-semibold text-green-700 mb-4">{job.category || "Umum"}</p>

          {job.deadline && (
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Batas Lamaran:</span> <br />
              {new Date(job.deadline).toLocaleDateString("id-ID")}
            </p>
          )}

          {job.type && (
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Tipe:</span> <br />
              {job.type}
            </p>
          )}

          <button
            onClick={() => alert(`Melamar posisi: ${job.title}`)}
            className="w-full bg-green-600 text-white py-3 mt-4 rounded-lg font-semibold hover:bg-green-700"
          >
            Lamar Sekarang
          </button>
        </aside>
      </div>
    </div>
  );
}
