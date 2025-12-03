import { GiBinoculars } from "react-icons/gi"; 
import { BsFillRocketTakeoffFill } from "react-icons/bs"; 
import {
  FaUsers,
  FaCarAlt,
  FaMedal,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";
import Banner from "../components/Banner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Tentang() {
  const keunggulan = [
    {
      icon: <FaUsers className="text-4xl text-green-600 mb-4 animate-bounce" />,
      title: "Basis Pelanggan Beragam",
      desc: "Dipercaya oleh sektor perbankan, FMCG, telekomunikasi, ritel, pertambangan, dan migas.",
    },
    {
      icon: <FaCarAlt className="text-4xl text-green-600 mb-4 animate-bounce" />,
      title: "Pilihan Kendaraan Lengkap",
      desc: "Tersedia pilihan MPV, SUV, mobil mewah, hingga kendaraan niaga.",
    },
    {
      icon: <FaMedal className="text-4xl text-green-600 mb-4 animate-bounce" />,
      title: "Layanan Premium",
      desc: "Bantuan 24/7, home service, dan kendaraan pengganti untuk kenyamanan Anda.",
    },
    {
      icon: <FaGlobe className="text-4xl text-green-600 mb-4 animate-bounce" />,
      title: "Jaringan Luas",
      desc: "Jaringan luas di seluruh Indonesia, mencakup bengkel resmi dan umum berkualitas.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Banner
        title="TENTANG KAMI"
        description="Kami menyediakan berbagai pilihan mobil berkualitas tinggi yang sesuai untuk kebutuhan perjalanan pribadi, bisnis, dan keluarga Anda."
      />

      {/* Profil Perusahaan */}
      <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto pt-40 pb-20 px-6">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-extrabold mb-4">
            Solusi Transportasi Modern & Nyaman bersama CarGo di Rumbai, Pekanbaru
          </h2>
          <p className="text-gray-600 mb-6">
            CarGo hadir untuk memenuhi kebutuhan transportasi Anda dengan layanan yang andal, kendaraan terawat, dan proses pemesanan yang cepat dan aman. Berdiri di Rumbai, Pekanbaru, kami siap menjadi mitra perjalanan terbaik Anda.
          </p>

          <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
            <p className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" /> Booking Mudah
            </p>
            <p className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" /> Transaksi Aman
            </p>
            <p className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" /> Jaminan Harga Terbaik
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <img src="/img/lat.png" alt="tentang kami" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Sejarah Perusahaan */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-xl shadow-md p-10 border border-gray-200">
          <h3 className="text-2xl font-bold text-green-700 mb-4">Sejarah CarGo</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Didirikan pada tahun 2023, CarGo lahir dari kebutuhan masyarakat Rumbai, Pekanbaru akan layanan transportasi yang praktis dan terpercaya. Dengan hanya beberapa unit mobil di awal berdiri, CarGo tumbuh pesat berkat komitmen terhadap pelayanan terbaik dan inovasi teknologi dalam sistem pemesanan. Kini, CarGo telah melayani ribuan pelanggan dari berbagai kalangan dan terus berkembang sebagai penyedia solusi mobilitas yang modern dan efisien.
          </p>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-xl shadow-md p-10 grid md:grid-cols-2 gap-10 border border-blue-200">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-green-700 flex items-center gap-2 justify-center md:justify-start">
              <span><GiBinoculars /></span> Visi
            </h3>
            <p className="text-gray-600 mt-2">
              Menjadi perusahaan transportasi terpercaya yang memberikan kemudahan dan kenyamanan mobilitas di Pekanbaru dan sekitarnya.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-green-700 flex items-center gap-2 justify-center md:justify-start">
              <span><BsFillRocketTakeoffFill /></span> Misi
            </h3>
            <ul className="text-gray-600 mt-2 list-disc list-inside space-y-1 text-sm">
              <li>Menyediakan armada mobil berkualitas dan terawat.</li>
              <li>Memberikan pelayanan ramah, cepat, dan profesional.</li>
              <li>Mendukung kemajuan transportasi lokal dan pariwisata.</li>
              <li>Berinovasi dalam sistem pemesanan dan layanan digital.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN - CAROUSEL */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <Slider {...settings}>
          {keunggulan.map((item, index) => (
            <div key={index} className="p-4">
              <div className="bg-white rounded-xl shadow-md p-6 text-center h-full hover:shadow-xl transition duration-300">
                {item.icon}
                <h4 className="font-bold text-green-800 text-lg mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}
