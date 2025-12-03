import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaGasPump } from "react-icons/fa";
import { PiSeatFill } from "react-icons/pi";
import Banner from "../components/Banner";
import { MobilAPI } from "../services/MobilAPI";

export default function Mobil() {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Data State (dari API Supabase)
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari API
  useEffect(() => {
    async function loadMobil() {
      try {
        const data = await MobilAPI.fetchAll();
        setProductData(data);
      } catch (err) {
        console.error("Gagal memuat data mobil:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMobil();
  }, []);

  // Filter state
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading data mobil...
      </div>
    );
  }

  // Data filter dropdown
  const brands = ["All", ...new Set(productData.map((car) => car.brand))];
  const transmissions = [
    "All",
    ...new Set(productData.map((car) => car.specifications?.transmission)),
  ];
  const availabilities = ["All", "Tersedia", "Tidak Tersedia"];

  // Filter logic
  const filteredProducts = productData.filter((car) => {
    const matchBrand = selectedBrand === "All" || car.brand === selectedBrand;

    const matchAvailability =
      selectedAvailability === "All" ||
      (selectedAvailability === "Tersedia" && car.availability === true) ||
      (selectedAvailability === "Tidak Tersedia" && car.availability === false);

    const matchTransmission =
      selectedTransmission === "All" ||
      car.specifications?.transmission === selectedTransmission;

    const matchSearch =
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchBrand && matchAvailability && matchTransmission && matchSearch
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white">
      <Banner
        title="DAFTAR MOBIL"
        description="Kami menyediakan berbagai pilihan mobil berkualitas untuk kebutuhan perjalanan Anda."
      />

      <div className="max-w-7xl mx-auto px-4 py-12 flex gap-8">
        {/* Sidebar Filter */}
        <div className="w-64 bg-white p-6 shadow-md sticky top-24 self-start">
          <h3 className="text-xl font-bold mb-4">Filter</h3>

          {/* Brand */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Brand</label>
            <select
              className="select select-bordered w-full"
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
            >
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Ketersediaan */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Ketersediaan</label>
            <select
              className="select select-bordered w-full"
              value={selectedAvailability}
              onChange={(e) => {
                setSelectedAvailability(e.target.value);
                setCurrentPage(1);
              }}
            >
              {availabilities.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Transmisi */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Transmisi</label>
            <select
              className="select select-bordered w-full"
              value={selectedTransmission}
              onChange={(e) => {
                setSelectedTransmission(e.target.value);
                setCurrentPage(1);
              }}
            >
              {transmissions.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Daftar Mobil */}
        <div className="flex-1">
          {/* Search */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Pencarian</label>
            <input
              type="text"
              placeholder="Cari model atau brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Card mobil */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((car) => (
              <Link
                key={car.id}
                to={`/mobil/${car.id}`}
                className="rounded-md shadow-md hover:shadow-xl bg-white transition border border-gray-200"
              >
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-full h-48 object-cover"
                />
                <div className="px-3 py-4">
                  <h2 className="text-2xl font-bold">
                    {car.brand} {car.model} ({car.year})
                  </h2>
                  <p className="text-green-600 font-semibold">
                    Rp {car.price_per_day.toLocaleString()} / hari
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                      {car.brand}
                    </div>

                    <div className="flex items-center gap-1 border px-3 py-1 rounded-full text-sm">
                      <PiSeatFill /> {car.specifications.seats}
                    </div>

                    <div className="flex items-center gap-1 border px-3 py-1 rounded-full text-sm">
                      <FaClock /> {car.specifications.transmission}
                    </div>

                    <div className="flex items-center gap-1 border px-3 py-1 rounded-full text-sm">
                      <FaGasPump /> {car.specifications.fuel_type}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-10 gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-success text-white"
            >
              ← Sebelumnya
            </button>

            <span className="font-bold text-lg">{currentPage} / {totalPages}</span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-success text-white"
            >
              Selanjutnya →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
