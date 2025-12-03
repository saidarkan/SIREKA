import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import Banner from "../components/Banner";
import { ContactsAPI } from "../services/contactsAPI";

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: "",
    pesan: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ContactsAPI.create(formData);
      alert("Pesan berhasil dikirim!");
      setFormData({ nama: "", email: "", no_hp: "", pesan: "" });
    } catch (error) {
      alert("Gagal mengirim pesan. Silakan coba lagi.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <Banner
        title="HUBUNGI KAMI"
        description="Kami siap membantu Anda dengan informasi lebih lanjut mengenai layanan sewa mobil Bali 88 Trans."
      />

      {/* Info Kontak */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
          <FaMapMarkerAlt className="mx-auto mb-4 text-4xl text-green-600" />
          <h3 className="text-xl font-semibold mb-2">Alamat</h3>
          <p>Jl. Taman Siswa No.31, Bekasi, Kota Bekasi, Indonesia</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
          <FaPhoneAlt className="mx-auto mb-4 text-4xl text-green-600" />
          <h3 className="text-xl font-semibold mb-2">Telepon & Email</h3>
          <p>0812-3456-7890</p>
          <p>info@bali88trans.com</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition-shadow duration-300">
          <FaEnvelope className="mx-auto mb-4 text-4xl text-green-600" />
          <h3 className="text-xl font-semibold mb-2">Sosial Media</h3>
          <div className="flex justify-center gap-6 text-2xl">
            <a href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-800">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram" className="text-pink-500 hover:text-pink-700">
              <FaInstagram />
            </a>
          </div>
        </div>
      </section>

      {/* Form & Peta */}
      <section className="w-full bg-white min-h-[700px] px-6 md:px-20 py-16">
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
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email Anda"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="no_hp" className="block text-sm font-medium mb-1 text-gray-700">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="no_hp"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label htmlFor="pesan" className="block text-sm font-medium mb-1 text-gray-700">
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tuliskan pesan atau pertanyaan Anda..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Peta Lokasi */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <iframe
              title="Google Maps Bali 88 Trans"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.349655249501!2d106.98760117416764!3d-6.215158060988311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6992f6432fe8f3%3A0x80cb97d7638cd5df!2sJl.%20Taman%20Siswa%20No.31%2C%20Bekasi!5e0!3m2!1sen!2sid!4v1689500123456"
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
