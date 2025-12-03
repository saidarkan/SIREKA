import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import artikelData from "./artikels.json";

export default function DetailArtikel() {
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);
  const [rekomendasi, setRekomendasi] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentArtikel = artikelData.find((item) => item.id.toString() === id);
    if (!currentArtikel) {
      setError("Artikel tidak ditemukan.");
      return;
    }

    setArtikel(currentArtikel);

    const rekom = artikelData.filter(
      (item) => item.kategori === currentArtikel.kategori && item.id.toString() !== id
    );

    setRekomendasi(rekom);
  }, [id]);

  if (error) return <div className="text-red-600 p-4 mt-24">{error}</div>;
  if (!artikel) return <div className="p-4 mt-24">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4 py-12 flex flex-col lg:flex-row gap-10">

      {/* Artikel Utama */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
        <img
          src={artikel.gambar}
          alt={artikel.judul}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <p className="text-gray-500 text-sm mb-2">
          {new Date(artikel.tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{artikel.judul}</h1>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {artikel.isi}
        </div>
      </div>

      {/* Sidebar Rekomendasi */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Artikel Terkait
        </h3>
        {rekomendasi.length === 0 ? (
          <p className="text-sm text-gray-500">Tidak ada rekomendasi artikel.</p>
        ) : (
          <ul className="space-y-4">
            {rekomendasi.map((item) => (
              <li key={item.id} className="flex gap-4">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-20 h-16 object-cover rounded-md"
                />
                <div>
                  <Link
                    to={`/artikel/${item.id}`}
                    className="text-sm font-semibold text-green-700 hover:underline"
                  >
                    {item.judul}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {new Date(item.tanggal).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
