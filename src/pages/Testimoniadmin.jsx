// src/pages/Testimoni.jsx
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { TestimoniAPI } from "../services/testimoniAPI";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import GenericTable from "../components/GenericTable";

export default function Testimoni() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [testimonis, setTestimonis] = useState([]);

  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    pesan: "",
    foto: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loadTestimonis = async () => {
    try {
      setLoading(true);
      const data = await TestimoniAPI.fetchAll();
      setTestimonis(data);
    } catch (err) {
      setError("Gagal memuat testimoni");
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
      await TestimoniAPI.create(formData);
      setSuccess("Testimoni berhasil ditambahkan!");
      setFormData({ nama: "", jabatan: "", pesan: "", foto: "" });
      loadTestimonis();
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan testimoni.");
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
      await TestimoniAPI.update(editId, formData);
      setSuccess("Testimoni berhasil diperbarui!");
      setFormData({ nama: "", jabatan: "", pesan: "", foto: "" });
      setIsEditing(false);
      setEditId(null);
      loadTestimonis();
    } catch (err) {
      setError("Gagal memperbarui testimoni.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      nama: item.nama,
      jabatan: item.jabatan,
      pesan: item.pesan,
      foto: item.foto,
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus testimoni ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await TestimoniAPI.delete(id);
      loadTestimonis();
    } catch (err) {
      setError("Gagal menghapus testimoni.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonis();
  }, []);

  return (
    <div className="w-full p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Manajemen Testimoni
      </h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {isEditing ? "Edit Testimoni" : "Tambah Testimoni"}
        </h3>

        <form
          onSubmit={isEditing ? handleUpdate : handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="nama"
            placeholder="Nama pelanggan"
            value={formData.nama}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <input
            type="text"
            name="jabatan"
            placeholder="Jabatan"
            value={formData.jabatan}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <textarea
            name="pesan"
            placeholder="Isi pesan"
            value={formData.pesan}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <input
            type="text"
            name="foto"
            placeholder="URL foto"
            value={formData.foto}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg"
              disabled={loading}
            >
              {loading ? "Mohon tunggu..." : isEditing ? "Update" : "Tambah"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditId(null);
                  setFormData({ nama: "", jabatan: "", pesan: "", foto: "" });
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
          <h3 className="text-lg font-semibold">
            Daftar Testimoni ({testimonis.length})
          </h3>
        </div>

        {loading && <LoadingSpinner text="Memuat testimoni..." />}
        {!loading && testimonis.length === 0 && !error && (
          <EmptyState text="Belum ada testimoni." />
        )}
        {!loading && error && <EmptyState text="Gagal memuat data." />}

        {!loading && testimonis.length > 0 && (
          <GenericTable
            columns={["No", "Nama", "Jabatan", "Pesan", "Foto", "Aksi"]}
            data={testimonis}
            renderRow={(item, index) => [
              <td key="no" className="px-6 py-4 text-center">
                {index + 1}
              </td>,
              <td key="nama" className="px-6 py-4 text-center">
                {item.nama}
              </td>,
              <td key="jabatan" className="px-6 py-4 text-center">
                {item.jabatan}
              </td>,
              <td key="pesan" className="px-6 py-4 max-w-xs break-words">
                {item.pesan}
              </td>,
              <td key="foto" className="px-6 py-4 text-center">
                {item.foto && (
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-16 h-16 rounded-full object-cover inline-block"
                  />
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
