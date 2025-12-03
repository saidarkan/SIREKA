import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import carData from "../Data/car.json";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = carData.find((item) => item.id === parseInt(id));

  if (!car) {
    return <div className="text-center text-red-600 mt-10">Mobil tidak ditemukan.</div>;
  }

  return (
    <div className="p-6 md:p-10">
      {/* Tombol Back */}
      <div className="mb-6">
        <button
          className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition duration-300"
          onClick={() => navigate("/carlist")}
        >
          &#8592; Back to List
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {car.brand} {car.model} <span className="text-gray-500">({car.year})</span>
        </h1>

        <div className="w-full rounded-lg overflow-hidden shadow-md mb-8 bg-gray-100">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700 text-sm">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Spesifikasi</h2>
            <ul className="space-y-1">
              <li><strong>Kursi:</strong> {car.specifications.seats}</li>
              <li><strong>Bahan Bakar:</strong> {car.specifications.fuel_type}</li>
              <li><strong>Transmisi:</strong> {car.specifications.transmission}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Dimensi</h2>
            <ul className="space-y-1">
              <li><strong>Panjang:</strong> {car.dimensions.length} mm</li>
              <li><strong>Lebar:</strong> {car.dimensions.width} mm</li>
              <li><strong>Tinggi:</strong> {car.dimensions.height} mm</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Fitur</h2>
            <ul className="space-y-1">
              <li><strong>GPS:</strong> {car.features.gps ? "Ya" : "Tidak"}</li>
              <li><strong>AC:</strong> {car.features.air_conditioning ? "Ya" : "Tidak"}</li>
              <li><strong>Bluetooth:</strong> {car.features.bluetooth ? "Ya" : "Tidak"}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Harga & Ketersediaan</h2>
            <p><strong>Harga per Hari:</strong> Rp{car.price_per_day.toLocaleString("id-ID")}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`font-semibold ${car.availability ? "text-green-600" : "text-red-600"}`}>
                {car.availability ? "Tersedia" : "Tidak Tersedia"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
