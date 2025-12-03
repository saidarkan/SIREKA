export default function Dashboard() {
  return (
    <div id="dashboard-container" className="p-5">

      {/* Gambar Utama - Promo */}
      <div className="relative rounded-lg overflow-hidden h-[450px] mb-8">
        <img
          src="/img/pcr.jpg"
          alt="Promo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-white text-center p-4">
          <h2 className="text-xl font-semibold">SEWA</h2>
          <h1 className="text-4xl font-bold">PROMO</h1>
          <p className="mb-4">Sewa 10+ 1 Kursi Gratis Sewa</p>
          <button className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600">
            Sewa Sekarang
          </button>
        </div>
      </div>

      {/* Gambar Kursi & Meja */}
      <div className="grid grid-cols-3 gap-8">
        {/* Kursi (Lebih Lebar) */}
        <div className="relative rounded-lg overflow-hidden h-[300px] col-span-2">
          <img
            src="/img/pcr.jpg"
            alt="Kursi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-xl font-semibold">SEWA</h2>
            <h1 className="text-3xl font-bold">APA</h1>
            <p className="mb-4">Dapatkan Harga Spesial</p>
            <button className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600">
              Sewa Sekarang
            </button>
          </div>
        </div>

        {/* Meja (Lebih Kecil) */}
        <div className="relative rounded-lg overflow-hidden h-[300px]">
          <img
            src="/img/pcr.jpg"
            alt="Meja"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-xl font-semibold">SEWA</h2>
            <h1 className="text-3xl font-bold">MEJA</h1>
            <p className="mb-4">Dapatkan Harga Spesial</p>
            <button className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600">
              Sewa Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
