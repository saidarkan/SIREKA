import logo from "../assets/logo-company.png"; // Pastikan path-nya sesuai

export default function CompanyProfile() {
  return (
    <div className="px-0 pt-2 w-full">
      <div className="bg-black text-white p-8 rounded-xl shadow-lg w-full space-y-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img 
            src={logo} 
            alt="Company Logo" 
            className="w-16 h-16 rounded-full object-contain bg-white p-1" 
          />
          <h2 className="text-2xl font-bold">Profil Perusahaan</h2>
        </div>

        {/* Deskripsi */}
        <p className="text-gray-300 leading-relaxed">
          Vehicle Hire adalah perusahaan penyewaan kendaraan online yang menyediakan layanan rental mobil
          dengan proses yang cepat, aman, dan terpercaya. Kami berkomitmen untuk memberikan pengalaman terbaik
          bagi pelanggan individu maupun perusahaan dalam memenuhi kebutuhan transportasi mereka.
        </p>

        {/* Grid Info Umum & Kontak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-green-400 font-semibold text-lg mb-2">🧾 Informasi Umum</h3>
            <ul className="space-y-1">
              <li><span className="font-medium text-white">Nama Perusahaan:</span> Vehicle Hire Inc.</li>
              <li><span className="font-medium text-white">Tahun Berdiri:</span> 2020</li>
              <li><span className="font-medium text-white">Jenis Usaha:</span> Penyewaan Kendaraan</li>
              <li><span className="font-medium text-white">Wilayah Layanan:</span> Seluruh Indonesia</li>
            </ul>
          </div>
          <div>
            <h3 className="text-green-400 font-semibold text-lg mb-2">📍 Kontak Kami</h3>
            <ul className="space-y-1">
              <li><span className="font-medium text-white">Alamat:</span> Jl. Transportasi No. 88, Pekanbaru</li>
              <li><span className="font-medium text-white">Email:</span> support@vehiclehire.co.id</li>
              <li><span className="font-medium text-white">Telepon:</span> +62 812-3456-7890</li>
              <li><span className="font-medium text-white">Website:</span> www.vehiclehire.co.id</li>
            </ul>
          </div>
        </div>

        {/* Visi Misi */}
        <div>
          < h3 className="text-green-400 font-semibold text-lg mb-2">🎯 Visi & Misi</h3>
          <p className="mb-1">
            <span className="font-medium text-white">Visi:</span> Menjadi platform penyewaan kendaraan nomor satu di Indonesia dengan layanan yang profesional dan terpercaya.
          </p>
          <p>
            <span className="font-medium text-white">Misi:</span> Memberikan kemudahan akses terhadap layanan transportasi melalui teknologi digital serta membangun kemitraan jangka panjang dengan pelanggan dan mitra bisnis.
          </p>
        </div>
      </div>
    </div>
  );
}
