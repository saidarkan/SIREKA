import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Banner from "../components/Banner";

const packages = [
  {
    title: "Basic",
    price: 250000,
    subtitle: "Cocok untuk perjalanan singkat",
    features: [
      "Tanpa Supir",
      "Durasi max 12 jam",
      "Mobil City Car / Hatchback",
      "Include asuransi dasar",
    ],
    buttonText: "Pilih Paket Basic",
  },
  {
    title: "Standard",
    price: 400000,
    subtitle: "Paket populer dengan kenyamanan ekstra",
    features: [
      "Dengan Supir",
      "Durasi max 24 jam",
      "Mobil MPV / SUV",
      "Include bensin & asuransi",
    ],
    buttonText: "Pilih Paket Standard",
  },
  {
    title: "Premium",
    price: 750000,
    subtitle: "Pengalaman mewah dan profesional",
    features: [
      "Dengan Supir Profesional",
      "Durasi fleksibel (per hari)",
      "Mobil Premium (Innova, Fortuner)",
      "Include bensin, asuransi & antar-jemput",
    ],
    buttonText: "Pilih Paket Premium",
  },
];

export default function Pricing() {
  return (
    <div>
      <Banner
        title="DAFTAR PAKET"
        description="Kami menyediakan berbagai pilihan mobil berkualitas tinggi yang sesuai untuk kebutuhan perjalanan pribadi, bisnis, dan keluarga Anda."
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-20 px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16">
          Pilih Paket Rental Mobil
        </h2>

        <div className="max-w-6xl mx-auto relative grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative z-${10 - index} bg-white border rounded-xl shadow-lg p-8 flex flex-col items-center transition transform hover:-translate-y-3 hover:shadow-2xl ${index === 1 ? 'scale-105 border-2 border-green-600' : ''}`}
              style={{ marginTop: index === 0 ? '40px' : index === 2 ? '40px' : '0' }}
            >
              <h3 className="text-xl font-semibold text-green-700 mb-1 text-center uppercase tracking-wide">
                {pkg.title}
              </h3>
              <p className="text-sm text-gray-500 text-center mb-2">{pkg.subtitle}</p>
              <p className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Rp {pkg.price.toLocaleString("id-ID")}
              </p>
              <ul className="space-y-3 text-sm text-gray-700 w-full">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2"
                  >
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/cars"
                className="mt-8 bg-green-600 hover:bg-green-700 text-white text-sm px-6 py-2 rounded-full transition-all"
              >
                {pkg.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
