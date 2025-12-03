import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TeamAPI } from "../services/teamAPI"; // pastikan path-nya benar
import Banner from "../components/Banner";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

export default function OurTeamPage() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TeamAPI.fetchAll();
        setTeamData(data);
      } catch (err) {
        console.error("Gagal memuat data tim:", err);
        setError("Terjadi kesalahan saat memuat data tim.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const boss = teamData.find((person) => person.posisi === "Boss");
  const manager = teamData.find((person) => person.posisi === "Manager");
  const drivers = teamData.filter((person) => person.posisi === "Driver");

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <Banner
        title="OUR TEAM"
        description="Kami menyediakan berbagai pilihan mobil berkualitas tinggi yang sesuai untuk kebutuhan perjalanan pribadi, bisnis, dan keluarga Anda."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Tim Kami</h2>

        {loading ? (
          <div className="text-center text-gray-500 text-lg">Memuat data tim...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">{error}</div>
        ) : teamData.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">Data tidak ditemukan.</div>
        ) : (
          <>
            {/* Boss & Manager */}
            <div className="flex justify-center gap-8 mb-16">
              <div className="flex flex-wrap justify-center gap-8">
                {[boss, manager].map(
                  (person) =>
                    person && (
                      <Link
                        key={person.id}
                        to={`/team/${person.id}`}
                        className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition w-[300px]"
                      >
                        <img
                          src={person.gambar}
                          alt={person.nama}
                          className="w-full h-60 object-cover rounded-xl mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">{person.nama}</h3>
                        <p className="text-sm text-gray-600 mb-2">{person.posisi}</p>
                        <div className="flex justify-center gap-4 text-blue-600 text-lg">
                          <FaFacebookF className="cursor-pointer" />
                          <FaYoutube className="cursor-pointer text-red-600" />
                        </div>
                      </Link>
                    )
                )}
              </div>
            </div>

            {/* Drivers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {drivers.map((driver) => (
                <Link
                  key={driver.id}
                  to={`/team/${driver.id}`}
                  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
                >
                  <img
                    src={driver.gambar}
                    alt={driver.nama}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{driver.nama}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {driver.posisi} • {driver.experience}
                  </p>
                  <div className="flex justify-center gap-4 text-blue-600 text-lg">
                    <FaFacebookF className="cursor-pointer" />
                    <FaYoutube className="cursor-pointer text-red-600" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
