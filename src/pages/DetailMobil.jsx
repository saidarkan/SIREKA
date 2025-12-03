import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaCalendarAlt,
  FaPhone,
  FaHourglassHalf,
  FaStar,
} from "react-icons/fa";
import { PiSeatFill } from "react-icons/pi";
import { FaGasPump, FaClock } from "react-icons/fa6";
import vehicles from "./vehicles.json";
import reviewData from "./testimoni.json";
import { motion } from "framer-motion";
import { BookingAPI } from "../services/bookingAPI";
import { MobilAPI } from "../services/mobilAPI";
import { TestimoniAPI } from "../services/testimoniAPI";

export default function MobilDetail() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state || {};

  const [car, setCar] = useState(null);
  const [durasiInput, setDurasiInput] = useState(state.durasi || "");
  const [tanggalInput, setTanggalInput] = useState(state.tanggal || "");
  const [paketInput, setPaketInput] = useState(state.paket || "");
  const [hargaTotal, setHargaTotal] = useState(0);
  const [nama, setNama] = useState("");
  const [telp, setTelp] = useState("");

  const [reviews, setReviews] = useState([]);
  const [namaReview, setNamaReview] = useState("");
  const [jabatanReview, setJabatanReview] = useState("");
  const [ratingReview, setRatingReview] = useState(5);
  const [pesanReview, setPesanReview] = useState("");
  const [notifBooking, setNotifBooking] = useState({
    show: false,
    message: "",
  });

  // Ambil mobil berdasarkan ID
  useEffect(() => {
    async function fetchMobil() {
      try {
        const data = await MobilAPI.fetchAll();
        const found = data.find((v) => String(v.id) === String(id));

        if (found) {
          setCar({
            ...found,
            image: found.image || "/no-image.png",
            specifications: {
              seats: found.seats || 4,
              transmission: found.transmission || "Manual",
              fuel_type: found.fuel_type || "Bensin",
            },
          });
        } else {
          // fallback ke vehicles.json (kode asli Abang)
          const localCar = vehicles.find((v) => String(v.id) === String(id));
          setCar(localCar);
        }
      } catch (e) {
        console.error("Gagal fetch mobil:", e);
        const localCar = vehicles.find((v) => String(v.id) === String(id));
        setCar(localCar);
      }
    }

    fetchMobil();
  }, [id]);
  // Hitung total harga
  useEffect(() => {
    if (!car) return;
    const durasi = parseInt(durasiInput) || 0;
    const tambahanDriver = paketInput === "Dengan Driver" ? 100000 : 0;
    const total = (car.price_per_day + tambahanDriver) * durasi;
    setHargaTotal(total);
  }, [car, durasiInput, paketInput]);

  // Buka modal otomatis jika dari halaman pencarian
  useEffect(() => {
    if (state.openModal) {
      const timeout = setTimeout(() => {
        const modal = document.getElementById("modal_booking");
        if (modal) modal.showModal();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [state.openModal]);

  // Ambil review sesuai mobil
useEffect(() => {
  async function fetchReviews() {
    try {
      const data = await TestimoniAPI.fetchAll();
      const carReviews = data.filter((x) => String(x.car_id) === String(id));
      setReviews(carReviews);
    } catch (error) {
      console.error("Gagal fetch testimoni:", error);
      setReviews([]);
    }
  }
  fetchReviews();
}, [id]);



  // SUBMIT BOOKING
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!nama || !tanggalInput || !durasiInput || !paketInput || !telp) return;

    const bookingData = {
      mobil_id: id,
      nama,
      tanggal_pinjam: tanggalInput,
      durasi: parseInt(durasiInput),
      paket: paketInput,
      no_hp: telp,
    };

    try {
      await BookingAPI.create(bookingData);
      
      document.getElementById("modal_booking").close();

     
    } catch (error) {
      console.error("Gagal booking:", error);
      setNotifBooking({
        show: true,
        message: "Terjadi kesalahan saat booking.",
      });
      setTimeout(() => setNotifBooking({ show: false, message: "" }), 3000);
    }
  };

  // SUBMIT TESTIMONI
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!namaReview || !pesanReview) return;

    const newReview = {
      car_id: id,
      nama: namaReview,
      jabatan: jabatanReview || "Pelanggan",
      rating: ratingReview,
      pesan: pesanReview,
      foto: "https://i.pravatar.cc/150?u=" + namaReview,
    };

    try {
      await TestimoniAPI.create(newReview);
      setReviews((prev) => [...prev, newReview]);
      setNamaReview("");
      setJabatanReview("");
      setRatingReview(5);
      setPesanReview("");
   
    } catch (error) {
      console.error("Gagal menambah testimoni:", error);
      alert("Terjadi kesalahan saat mengirim testimoni.");
    }
  };

  if (!car) return <div className="text-center mt-24">Loading...</div>;

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-32 px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* NOTIFIKASI BOOKING */}
      {/* NOTIFIKASI BOOKING MODERN */}
      {notifBooking.show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
        >
          {/* Icon centang */}
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium">{notifBooking.message}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* BAGIAN KIRI – DETAIL MOBIL */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.img
            src={car.image}
            alt={car.model}
            className="rounded-xl w-full h-64 object-cover shadow-lg mb-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />

          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            {car.brand} {car.model} ({car.year})
          </h2>

          <p className="text-green-600 text-xl font-semibold mb-3">
            Rp {car.price_per_day.toLocaleString()} / hari
          </p>

          <div className="mb-4">
            {car.availability ? (
              <span className="inline-flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm">
                <FaCheckCircle /> Tersedia
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm">
                <FaTimesCircle /> Tidak Tersedia
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-gray-700">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <PiSeatFill /> {car.specifications.seats} Kursi
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <FaClock /> {car.specifications.transmission}
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <FaGasPump /> {car.specifications.fuel_type}
            </div>
          </div>

          <p className="mt-6 text-gray-600 text-sm">
            {car.description ||
              "Mobil berkualitas, cocok untuk berbagai keperluan perjalanan Anda."}
          </p>

          <button
            className="btn mt-6 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => document.getElementById("modal_booking").showModal()}
          >
            Pesan Sekarang
          </button>
        </motion.div>

        {/* BAGIAN KANAN – REVIEW */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-6 border border-gray-100"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Review Pengguna
          </h3>

          {reviews.length > 0 ? (
            <ul className="space-y-4 mb-6">
              {reviews.map((r, i) => (
                <li
                  key={i}
                  className="bg-gray-50 p-4 rounded-md border flex gap-4"
                >
                  <img
                    src={r.foto}
                    alt={r.nama}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-700 flex items-center gap-2">
                      {r.nama}
                      <span className="text-yellow-500 flex items-center gap-1">
                        {[...Array(Math.round(r.rating))].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                        <span className="text-gray-600 text-xs ml-1">
                          ({r.rating}/5)
                        </span>
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 italic">{r.jabatan}</p>
                    <p className="text-sm text-gray-600 mt-1">"{r.pesan}"</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mb-6">
              Belum ada review untuk mobil ini.
            </p>
          )}

          {/* Form tambah review */}
          <form onSubmit={handleAddReview} className="space-y-3 border-t pt-4">
            <h4 className="font-semibold text-gray-800 text-lg">
              Tambah Testimoni
            </h4>

            <input
              type="text"
              placeholder="Nama Anda"
              value={namaReview}
              onChange={(e) => setNamaReview(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />

            <input
              type="text"
              placeholder="Jabatan (opsional)"
              value={jabatanReview}
              onChange={(e) => setJabatanReview(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />

            <select
              value={ratingReview}
              onChange={(e) => setRatingReview(Number(e.target.value))}
              className="w-full border rounded-md px-3 py-2"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Bintang
                </option>
              ))}
            </select>

            <textarea
              placeholder="Tulis pesan Anda..."
              value={pesanReview}
              onChange={(e) => setPesanReview(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              rows={3}
              required
            />

            <button className="btn bg-green-600 hover:bg-green-700 text-white w-full">
              Kirim Testimoni
            </button>
          </form>
        </motion.div>
      </div>

      {/* MODAL BOOKING */}
      <dialog id="modal_booking" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Form Pemesanan</h3>

          <form onSubmit={handleBooking} className="space-y-3 text-sm mt-4">
            <input
              type="text"
              placeholder="Nama lengkap"
              required
              className="w-full border rounded-md px-3 py-2"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />

            <input
              type="date"
              value={tanggalInput}
              onChange={(e) => setTanggalInput(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />

            <input
              type="number"
              min="1"
              value={durasiInput}
              onChange={(e) => setDurasiInput(e.target.value)}
              placeholder="Durasi"
              className="w-full border rounded-md px-3 py-2"
            />

            <select
              value={paketInput}
              onChange={(e) => setPaketInput(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Pilih Paket</option>
              <option value="Dengan Driver">Dengan Driver</option>
              <option value="Tanpa Driver">Tanpa Driver</option>
            </select>

            <input
              type="tel"
              placeholder="08xxxxxxxxxx"
              required
              className="w-full border rounded-md px-3 py-2"
              value={telp}
              onChange={(e) => setTelp(e.target.value)}
            />

            <input
              type="text"
              readOnly
              value={`Rp${hargaTotal.toLocaleString("id-ID")}`}
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />

            <div className="modal-action flex justify-between">
              <button className="btn bg-green-600 hover:bg-green-700 text-white">
                Pesan
              </button>

              <form method="dialog">
                <button className="btn">Tutup</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>

      {/* SYARAT KETENTUAN */}
      <motion.div
        className="mt-12 bg-gray-50 border-t border-gray-200 rounded-xl p-6 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          Syarat & Ketentuan
        </h4>

        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>Usia minimal penyewa 21 tahun & memiliki SIM A aktif.</li>
          <li>Tunjukkan identitas saat pengambilan mobil.</li>
          <li>Pembayaran dilakukan sebelum mobil digunakan.</li>
          <li>Harga belum termasuk bahan bakar.</li>
          <li>Kerusakan karena kelalaian ditanggung penyewa.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
