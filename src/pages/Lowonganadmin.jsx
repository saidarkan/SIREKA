// src/pages/Lowongan.jsx
import { useEffect, useState } from "react"
import { BiPencil } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { LowonganAPI } from "../services/lowonganAPI"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"
import GenericTable from "../components/GenericTable"

export default function Lowongan() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [lowongans, setLowongans] = useState([])

  const [formData, setFormData] = useState({
    posisi: "",
    lokasi: "",
    deskripsi: ""
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value }) 
  }

  const loadLowongans = async () => {
    try {
      setLoading(true)
      const data = await LowonganAPI.fetchAll()
      setLowongans(data)
    } catch (err) {
      setError("Gagal memuat data lowongan.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      setSuccess("")
      await LowonganAPI.create(formData)
      setSuccess("Lowongan berhasil ditambahkan!")
      setFormData({ posisi: "", lokasi: "", deskripsi: "" })
      loadLowongans()
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan lowongan.")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      setSuccess("")
      await LowonganAPI.update(editId, formData)
      setSuccess("Lowongan berhasil diperbarui!")
      setFormData({ posisi: "", lokasi: "", deskripsi: "" })
      setIsEditing(false)
      setEditId(null)
      loadLowongans()
    } catch (err) {
      setError("Gagal memperbarui lowongan.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    setFormData({
      posisi: item.posisi,
      lokasi: item.lokasi,
      deskripsi: item.deskripsi
    })
    setIsEditing(true)
    setEditId(item.id)
  }

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus lowongan ini?")
    if (!konfirmasi) return

    try {
      setLoading(true)
      await LowonganAPI.delete(id)
      loadLowongans()
    } catch (err) {
      setError("Gagal menghapus lowongan.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLowongans()
  }, [])

  return (
    <div className="w-full p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Lowongan</h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {isEditing ? "Edit Lowongan" : "Tambah Lowongan"}
        </h3>

        <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="space-y-4">
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
            name="lokasi"
            placeholder="Lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200"
          />
          <textarea
            name="deskripsi"
            placeholder="Deskripsi pekerjaan"
            value={formData.deskripsi}
            onChange={handleChange}
            required
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
                  setIsEditing(false)
                  setEditId(null)
                  setFormData({ posisi: "", lokasi: "", deskripsi: "" })
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
            Daftar Lowongan ({lowongans.length})
          </h3>
        </div>

        {loading && <LoadingSpinner text="Memuat lowongan..." />}
        {!loading && lowongans.length === 0 && !error && <EmptyState text="Belum ada lowongan." />}
        {!loading && error && <EmptyState text="Gagal memuat data." />}

        {!loading && lowongans.length > 0 && (
          <GenericTable
  columns={["No", "Posisi", "Lokasi", "Deskripsi", "Aksi"]}
  data={lowongans}
  renderRow={(item, index) => ([
    <td key="no" className="px-6 py-4 text-center">{index + 1}</td>,
    <td key="posisi" className="px-6 py-4 text-center">{item.posisi}</td>,
    <td key="lokasi" className="px-6 py-4 text-center">{item.lokasi}</td>,
    <td key="deskripsi" className="px-6 py-4 max-w-xs break-words text-center">
      {item.deskripsi}
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
  ])}
/>

        )}
      </div>
    </div>
  )
}
