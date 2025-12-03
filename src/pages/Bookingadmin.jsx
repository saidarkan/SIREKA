import { useEffect, useState } from "react";
import { BookingAPI } from "../services/bookingAPI";
import { MobilAPI } from "../services/mobilAPI"; // ← tambahan
import { motion } from "framer-motion";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [mobils, setMobils] = useState([]); // ← data mobil
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newBooking, setNewBooking] = useState({
    nama: "",
    paket: "",
    tanggal_pinjam: "",
    durasi: 1,
    no_hp: "",
    status: "Pending",
    mobil_id: null, // ← field baru
  });

  // ==============================
  // FETCH DATA BOOKING + MOBIL
  // ==============================
  useEffect(() => {
    fetchBookings();
    fetchMobils();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await BookingAPI.fetchAll();
      setBookings(data);
    } catch (error) {
      console.error("Gagal fetch bookings:", error);
    }
  };

  const fetchMobils = async () => {
    try {
      const data = await MobilAPI.fetchAll();
      setMobils(data);
    } catch (error) {
      console.error("Gagal fetch mobil:", error);
    }
  };

  // ==============================
  // SORT
  // ==============================
  const sortBy = (key) => {
    const sorted = [...bookings].sort((a, b) => {
      const valA = (a[key] ?? "").toString().toLowerCase();
      const valB = (b[key] ?? "").toString().toLowerCase();
      return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

    setBookings(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // ==============================
  // FILTER
  // ==============================
  const filtered = bookings.filter((b) =>
    (b.nama ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // ==============================
  // SAVE & UPDATE
  // ==============================
  const handleSave = async () => {
    try {
      if (editingId) {
        await BookingAPI.update(editingId, newBooking);
      } else {
        await BookingAPI.create(newBooking);
      }

      await fetchBookings();

      setNewBooking({
        nama: "",
        paket: "",
        tanggal_pinjam: "",
        durasi: 1,
        no_hp: "",
        status: "Pending",
        mobil_id: null,
      });

      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      console.error("Gagal save booking:", error);
    }
  };

  // ==============================
  // EDIT DATA
  // ==============================
  const handleEdit = (b) => {
    setNewBooking({
      nama: b.nama,
      paket: b.paket,
      tanggal_pinjam: b.tanggal_pinjam,
      durasi: b.durasi,
      no_hp: b.no_hp,
      status: b.status ?? "Pending",
      mobil_id: b.mobil_id, // ← penting
    });

    setEditingId(b.id);
    setShowForm(true);
  };

  // ==============================
  // DELETE
  // ==============================
  const handleDelete = async (id) => {
    try {
      await BookingAPI.delete(id);
      fetchBookings();
    } catch (error) {
      console.error("Gagal delete:", error);
    }
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Booking List</h1>

      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by customer name..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md"
          onClick={() => {
            setNewBooking({
              nama: "",
              paket: "",
              tanggal_pinjam: "",
              durasi: 1,
              no_hp: "",
              status: "Pending",
              mobil_id: null,
            });
            setShowForm(true);
            setEditingId(null);
          }}
        >
          + Add Booking
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-6 mb-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Booking" : "Add New Booking"}
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {/* Nama */}
            <input
              type="text"
              placeholder="Nama"
              className="border px-4 py-2 rounded"
              value={newBooking.nama}
              onChange={(e) => setNewBooking({ ...newBooking, nama: e.target.value })}
            />

            {/* Paket */}
            <input
              type="text"
              placeholder="Paket"
              className="border px-4 py-2 rounded"
              value={newBooking.paket}
              onChange={(e) => setNewBooking({ ...newBooking, paket: e.target.value })}
            />

            {/* Mobil */}
            <select
              className="border px-4 py-2 rounded"
              value={newBooking.mobil_id || ""}
              onChange={(e) =>
                setNewBooking({ ...newBooking, mobil_id: parseInt(e.target.value) })
              }
            >
              <option value="">-- Pilih Mobil --</option>
              {mobils.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.brand} {m.model} ({m.year})
                </option>
              ))}
            </select>

            {/* Tanggal Pinjam */}
            <input
              type="date"
              className="border px-4 py-2 rounded"
              value={newBooking.tanggal_pinjam}
              onChange={(e) =>
                setNewBooking({ ...newBooking, tanggal_pinjam: e.target.value })
              }
            />

            {/* Durasi */}
            <input
              type="number"
              min="1"
              className="border px-4 py-2 rounded"
              value={newBooking.durasi}
              onChange={(e) =>
                setNewBooking({ ...newBooking, durasi: parseInt(e.target.value) })
              }
            />

            {/* No HP */}
            <input
              type="text"
              placeholder="No HP"
              className="border px-4 py-2 rounded"
              value={newBooking.no_hp}
              onChange={(e) =>
                setNewBooking({ ...newBooking, no_hp: e.target.value })
              }
            />

            {/* Status */}
            <select
              className="border px-4 py-2 rounded"
              value={newBooking.status}
              onChange={(e) =>
                setNewBooking({ ...newBooking, status: e.target.value })
              }
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>

          </div>

          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleSave}
            >
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto"
      >
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <tr>
              <th className="px-4 py-3 cursor-pointer" onClick={() => sortBy("nama")}>
                Customer {sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th className="px-4 py-3">Paket</th>
              <th className="px-4 py-3">Mobil</th>
              <th className="px-4 py-3">Tanggal Pinjam</th>
              <th className="px-4 py-3">Durasi</th>
              <th className="px-4 py-3">No HP</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filtered.map((b, i) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-100`}
              >
                <td className="px-4 py-3">{b.nama}</td>
                <td className="px-4 py-3">{b.paket}</td>

                <td className="px-4 py-3">
                  {mobils.find((m) => m.id === b.mobil_id)?.model || "-"}
                </td>

                <td className="px-4 py-3">{b.tanggal_pinjam}</td>
                <td className="px-4 py-3">{b.durasi} hari</td>
                <td className="px-4 py-3">{b.no_hp}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      b.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : b.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="px-4 py-3 space-x-2">
                  <button onClick={() => handleEdit(b)} className="text-blue-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(b.id)} className="text-red-600">
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
