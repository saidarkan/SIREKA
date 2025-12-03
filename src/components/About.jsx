import { FaCheckCircle, FaUserTie, FaCarAlt, FaRegCheckCircle } from "react-icons/fa";

export default function About() {
    return (
        <div className="bg-white mt-40 pt-8  px-4">
            {/* Bagian Atas */}
            <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-extrabold mb-4">
                        Raih kebebasan dan fleksibilitas berkendara dengan menyewa mobil di CarGO
                    </h2>
                    <p className="text-gray-600 mb-6">
                        CarGO memberikan kemudahan, kenyamanan, dan pengalaman lokal
                        yang otentik kepada para pelanggan. Dengan menggunakan layanan ini,
                        pelanggan dapat menikmati perjalanan mereka tanpa khawatir mengemudi,
                        mendapatkan rekomendasi terbaik, menghemat waktu dan tenaga, serta
                        mengesankan tamu mereka dengan unit mobil keluaran terbaru.
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
                        <p className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Booking Mudah</p>
                        <p className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Transaksi Aman</p>
                        <p className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Jaminan Harga Terbaik</p>
                    </div>
                </div>

                {/* Gambar */}
                <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
                    <img src="/img/lat.png" alt="lat" className="max-w-full h-auto" />
                </div>
            </div>

            {/* Bagian "Dipercaya oleh" */}
            <div className="text-center mt-28 max-w-5xl mx-auto">
                <p className="text-sm text-gray-500 mb-2">Alasan Memilih Kami</p>
                <h3 className="text-2xl font-bold">
                    Dipercaya Oleh <span className="text-green-600">450+ Perusahaan di Indonesia</span>
                </h3>
                <p className="mt-4 text-sm text-gray-600">
                    Dengan supir berpengalaman, mobil keluaran terbaru, dan layanan maksimal hingga 12 jam,
                    kami menawarkan perjalanan yang aman, nyaman, dan fleksibel untuk memenuhi kebutuhan Anda secara maksimal.
                </p>

                {/* Box Icon */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8   rounded-xl p-6">
                    {/* Supir */}
                    <div className="flex flex-col items-center text-center">
                        <FaUserTie className="text-green-600 text-4xl mb-3" />
                        <p className="font-semibold">Supir berpengalaman</p>
                        <p className="text-sm text-gray-600">Perjalanan aman dengan supir berpengalaman dan terlatih</p>
                    </div>

                    {/* Mobil */}
                    <div className="flex flex-col items-center text-center">
                        <FaCarAlt className="text-green-600 text-4xl mb-3" />
                        <p className="font-semibold">Mobil Terbaru</p>
                        <p className="text-sm text-gray-600">Kenyamanan dan kehandalan dari mobil-mobil terbaru dan terawat</p>
                    </div>

                    {/* Garansi */}
                    <div className="flex flex-col items-center text-center">
                        <FaRegCheckCircle className="text-green-600 text-4xl mb-3" />
                        <p className="font-semibold">Bergaransi</p>
                        <p className="text-sm text-gray-600">Menjamin kepuasan pelanggan dan kualitas layanan superior</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
