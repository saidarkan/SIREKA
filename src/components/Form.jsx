import { useState } from "react";
import { useNavigate } from "react-router-dom";
import produkData from '../pages/vehicles.json';
import { FaChevronDown } from "react-icons/fa";

function FormPencarianMobil() {
  const [selectedMobilId, setSelectedMobilId] = useState("");
  const [durasi, setDurasi] = useState(1);
  const [paket, setPaket] = useState("");
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [hargaTotal, setHargaTotal] = useState(0);
  const navigate = useNavigate();

  const hitungHarga = (id, durasi, paket) => {
    const mobil = produkData.find((m) => m.id === parseInt(id));
    if (!mobil || !durasi) {
      setHargaTotal(0);
      return;
    }
    const hargaDasar = mobil.price_per_day;
    const tambahanDriver = paket === "Dengan Driver" ? 100000 : 0;
    const total = (hargaDasar + tambahanDriver) * durasi;
    setHargaTotal(total);
  };

  const handleMobilChange = (e) => {
    const id = e.target.value;
    setSelectedMobilId(id);
    hitungHarga(id, durasi, paket);
  };

  const handleDurasiChange = (e) => {
    const d = parseInt(e.target.value) || 1;
    setDurasi(d);
    hitungHarga(selectedMobilId, d, paket);
  };

  const handlePaketChange = (e) => {
    const p = e.target.value;
    setPaket(p);
    hitungHarga(selectedMobilId, durasi, p);
  };

  const handleLihatDetail = () => {
    if (selectedMobilId) {
      navigate(`/mobil/${selectedMobilId}`, {
        state: {
          durasi,
          paket,
          tanggal: tanggalPinjam,
          hargaTotal,
          openModal: true,
        },
      });
    }
  };

  const dropdownClass =
    "appearance-none bg-gray-50 border border-gray-300 text-sm rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400";

  const inputClass =
    "text-sm px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400";

  return (
    <div className="relative z-20 -mt-20 mb-10 max-w-6xl mx-auto px-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end">
        {/* Lokasi */}
        <div className="flex flex-col relative">
          <label className="text-xs font-semibold text-gray-500 mb-1">Lokasi</label>
          <select className={`${dropdownClass}`}>
            <option>Pilih Lokasi</option>
            <option>Bali</option>
            <option>Jakarta</option>
            <option>Surabaya</option>
          </select>
          <FaChevronDown className="absolute right-3 bottom-3 text-gray-400 pointer-events-none" />
        </div>

        {/* Jenis Mobil */}
        <div className="flex flex-col relative">
          <label className="text-xs font-semibold text-gray-500 mb-1">Jenis Mobil</label>
          <select
            className={dropdownClass}
            value={selectedMobilId}
            onChange={handleMobilChange}
          >
            <option value="">Pilih Mobil</option>
            {produkData.map((mobil) => (
              <option key={mobil.id} value={mobil.id}>
                {mobil.model} ({mobil.brand})
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-3 bottom-3 text-gray-400 pointer-events-none" />
        </div>

        {/* Tanggal Peminjaman */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 mb-1">Tanggal Peminjaman</label>
          <input
            type="date"
            value={tanggalPinjam}
            onChange={(e) => setTanggalPinjam(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Durasi */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 mb-1">Durasi (hari)</label>
          <input
            type="number"
            min="1"
            value={durasi}
            onChange={handleDurasiChange}
            className={inputClass}
            placeholder="Misal: 3"
          />
        </div>

        {/* Paket */}
        <div className="flex flex-col relative">
          <label className="text-xs font-semibold text-gray-500 mb-1">Paket</label>
          <select
            className={dropdownClass}
            value={paket}
            onChange={handlePaketChange}
          >
            <option value="">Pilih Paket</option>
            <option value="Dengan Driver">Dengan Driver</option>
            <option value="Tanpa Driver">Tanpa Driver</option>
          </select>
          <FaChevronDown className="absolute right-3 bottom-3 text-gray-400 pointer-events-none" />
        </div>

        {/* Harga Total */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-500 mb-1">Total Harga</label>
          <input
            type="text"
            readOnly
            value={
              hargaTotal > 0
                ? `Rp${hargaTotal.toLocaleString("id-ID")}`
                : "Rp0"
            }
            className={`${inputClass} font-semibold bg-gray-100`}
          />
        </div>

        {/* Tombol */}
        <div>
          <button
            onClick={handleLihatDetail}
            className={`w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition ${
              !selectedMobilId && "pointer-events-none opacity-50"
            }`}
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormPencarianMobil;
