// src/pages/Tim.jsx
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { TimAPI } from "../services/timAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import GenericTable from "../components/GenericTable";

export default function Tim() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tim, setTim] = useState([]);

  const [formData, setFormData] = useState({
    nama: "",
    posisi: "",
    gambar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loadTim = async () => {
    try {
      setLoading(true);
      const data = await TimAPI.fetchAll();
      setTim(data);
    } catch (err) {
      setError("Gagal memuat data tim");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await TimAPI.create(formData);
      setSuccess("Data tim berhasil ditambahkan!");
      setFormData({ nama: "", posisi: "", gambar: "" });
      loadTim();
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data tim.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await TimAPI.update(editId, formData);
      setSuccess("Data tim berhasil diperbarui!");
      setFormData({ nama: "", posisi: "", gambar: "" });
      setIsEditing(false);
      setEditId(null);
      loadTim();
    } catch (err) {
      setError("Gagal memperbarui data tim.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      nama: item.nama,
      posisi: item.posisi,
      gambar: item.gambar,
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus data tim ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await TimAPI.delete(id);
      loadTim();
    } catch (err) {
      setError("Gagal menghapus data tim.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTim();
  }, []);

  return (
    <div className="w-full p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Tim</h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {isEditing ? "Edit Data Tim" : "Tambah Data Tim"}
        </h3>

        <form
          onSubmit={isEditing ? handleUpdate : handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <input
            type="text"
            name="posisi"
            placeholder="Posisi"
            value={formData.posisi}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <input
            type="text"
            name="gambar"
            placeholder="Path Gambar (contoh: ./img/1.jpeg)"
            value={formData.gambar}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <div className="flex space-x-4">
            <button
              type="submit"
              data-testid="submit-button" // <-- tambahkan ini
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg"
              disabled={loading}
            >
              {loading ? "Mohon tunggu..." : isEditing ? "Update" : "Tambah"}
            </button>

            {isEditing && (
              <button
                type="button"
                data-testid="cancel-button" 
                onClick={() => {
                  setIsEditing(false);
                  setEditId(null);
                  setFormData({ nama: "", posisi: "", gambar: "" });
                }}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-2xl"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold">Daftar Tim ({tim.length})</h3>
        </div>

        {loading && <LoadingSpinner text="Memuat data tim..." />}
        {!loading && tim.length === 0 && !error && (
          <EmptyState text="Belum ada data tim." />
        )}
        {!loading && error && <EmptyState text="Gagal memuat data." />}

        {!loading && tim.length > 0 && (
          <GenericTable
            columns={["No", "Nama", "Posisi", "Gambar", "Aksi"]}
            data={tim}
            renderRow={(item, index) => [
              <td key="no" className="px-6 py-4 text-center">
                {index + 1}
              </td>,
              <td key="nama" className="px-6 py-4 text-center">
                {item.nama}
              </td>,
              <td key="posisi" className="px-6 py-4 text-center">
                {item.posisi}
              </td>,
              <td key="gambar" className="px-6 py-4 text-center">
                {item.gambar ? (
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-16 h-16 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <span className="text-gray-400 italic">Tidak ada gambar</span>
                )}
              </td>,
              <td key="aksi" className="px-6 py-4">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    title="Edit"
                    className="p-2 rounded-full text-blue-500 hover:text-blue-700"
                    disabled={loading}
                  >
                    <BiPencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Hapus"
                    className="p-2 rounded-full text-red-500 hover:text-red-700"
                    disabled={loading}
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              </td>,
            ]}
          />
        )}
      </div>
    </div>
  );
}
