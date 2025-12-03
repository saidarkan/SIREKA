export default function Banner({ title, description }) {
    return (
        <div className="relative h-100 w-full overflow-hidden backdrop-blur-sm">
            {/* Background image dengan efek hover */}
            <img
                src="/img/mobil.jpg"
                alt="Mobil Promo"
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110 backdrop-blur-sm"
            />

            {/* Overlay dengan gradient dan konten */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col items-center justify-center text-white px-4 text-center">
                {title && (
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-shadow-lg mt-20">
                        {title}
                    </h2>
                )}

                {description && (
                    <p className="text-sm md:text-base max-w-xl mb-6 opacity-80">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
