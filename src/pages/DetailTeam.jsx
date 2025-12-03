import { useParams, Link } from "react-router-dom";
import teamData from "./teams.json";

export default function TeamDetailPage() {
  const { id } = useParams();

  // Cari anggota tim berdasarkan id
  const member = teamData.find((person) => person.id.toString() === id);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-500">Anggota tim tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <img
          src={member.image}
          alt={member.name}
          className="w-40 h-40 rounded-full object-cover mx-auto mb-6 shadow-lg"
        />
        <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
        <p className="text-green-600 text-md font-medium mb-4">{member.position}</p>

        <div className="text-gray-700 text-base leading-relaxed mb-8">
          {member.description ? (
            <p>{member.description}</p>
          ) : (
            <p>
              {member.name} adalah {member.position.toLowerCase()} yang berdedikasi di Bali 88 Trans. 
              Kami sangat menghargai kontribusi luar biasa dari setiap anggota tim.
            </p>
          )}
        </div>

        <Link
          to="/our-team"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Kembali ke Daftar Tim
        </Link>
      </div>
    </div>
  );
}
