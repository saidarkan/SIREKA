import React, { useState } from "react";
import { ContactsAPI } from "../services/contactsAPI"; // sesuaikan path-nya

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: "",
    pesan: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ContactsAPI.create(formData);
      alert("Pesan berhasil dikirim!");
      setFormData({ nama: "", email: "", no_hp: "", pesan: "" });
    } catch (error) {
      console.error("Gagal mengirim:", error.response?.data || error);
      alert("Gagal mengirim pesan.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="w-full bg-gray-100 min-h-[700px] px-6 md:px-20 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Hubungi Kami
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2.5fr_3fr] gap-12">
          {/* Form Kontak */}
          <div className="p-10 rounded-3xl shadow-lg bg-white">
            <h2 className="text-3xl font-bold mb-8 text-green-700">Hubungi Kami Langsung</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nama" className="block text-sm font-medium mb-1 text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  placeholder="Masukkan nama lengkap Anda"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-4 py-3 focus:ring-green-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-4 py-3 focus:ring-green-600"
                />
              </div>
              <div>
                <label htmlFor="no_hp" className="block text-sm font-medium mb-1 text-gray-700">
                  Nomor HP
                </label>
                <input
                  type="tel"
                  id="no_hp"
                  name="no_hp"
                  placeholder="0812-xxxx-xxxx"
                  value={formData.no_hp}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3 focus:ring-green-600"
                />
              </div>
              <div>
                <label htmlFor="pesan" className="block text-sm font-medium mb-1 text-gray-700">
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows="5"
                  placeholder="Tuliskan pesan..."
                  value={formData.pesan}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-4 py-3 resize-none focus:ring-green-600"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Peta */}
     {/* Peta Lokasi */}
<div className="rounded-3xl overflow-hidden shadow-lg">
  <iframe
    title="Google Maps Bali 88 Trans"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3497160675366!2d106.98543001538677!3d-6.215129995492797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6992f6432fe8f3%3A0x80cb97d7638cd5df!2sJl.%20Taman%20Siswa%20No.31%2C%20Bekasi!5e0!3m2!1sid!2sid!4v1689500123456!5m2!1sid!2sid"
    width="100%"
    height="100%"
    style={{ minHeight: "450px", border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

        </div>
      </section>
    </div>
  );
}
