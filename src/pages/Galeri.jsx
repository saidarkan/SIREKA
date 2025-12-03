import { useEffect, useState } from "react";
import { galeriFotoAPI } from "../services/galeriAPI";
import Banner from "../components/Banner";

export default function Galeri() {
    const [galleryData, setGalleryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await galeriFotoAPI.fetchGaleriFotos();
                setGalleryData(data);
            } catch (err) {
                console.error("Gagal memuat galeri:", err);
                setError("Terjadi kesalahan saat memuat galeri.");
                setShowError(true);
                // Sembunyikan pesan error setelah 3 detik
                setTimeout(() => {
                    setShowError(false);
                }, 3000);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Banner
                title="GALERI KENDARAAN"
                description="Jelajahi koleksi foto kendaraan kami untuk melihat berbagai pilihan mobil yang tersedia untuk disewa."
            />

            <div className="max-w-7xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center text-gray-500 text-lg">Memuat galeri...</div>
                ) : showError && error ? (
                    <div className="text-center text-red-500 text-lg">{error}</div>
                ) : galleryData.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg">Data tidak ditemukan.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {galleryData.map((item) => (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
                            >
                                <img
                                    src={item.media}
                                    alt={item.judul}
                                    className="w-full h-48 object-cover rounded-2xl"
                                />
                                <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl">
                                    <h2 className="text-white text-lg font-semibold text-center px-2">
                                        {item.judul}
                                    </h2>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
