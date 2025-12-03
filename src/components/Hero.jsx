"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Form from "../components/Form";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Cek apakah modal sudah pernah ditampilkan
    const isPromoShown = sessionStorage.getItem("promoShown");

    if (!isPromoShown) {
      setShowModal(true);
      sessionStorage.setItem("promoShown", "true");
    }
  }, []);

  return (
    <div className="relative h-150 w-full">
      
      {/* Background */}
      <img
        src="/img/mobil.jpg"
        alt="Mobil Promo"
        className="w-full h-full object-cover brightness-[.4]"
      />

      {/* Konten Hero */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
        <Form />
        <motion.h2
          className="text-xl md:text-2xl font-medium mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Nikmati layanan sewa mobil di Bali dengan
        </motion.h2>
        <motion.h1
          className="text-2xl md:text-4xl font-bold mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          mudah dan aman bersama
        </motion.h1>
        <motion.p
          className="text-sm md:text-base max-w-xl mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Kami menyediakan berbagai pilihan mobil berkualitas tinggi yang sesuai
          untuk kebutuhan perjalanan pribadi, bisnis, dan keluarga Anda.
        </motion.p>
      </div>

    

      {/* Modal Gambar Promo */}
      <AnimatePresence>
        {showModal && (
          <motion.dialog
            className="modal modal-open"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-box p-0 overflow-hidden max-w-3xl relative bg-transparent shadow-none">
              <button
                className="absolute top-2 right-2 text-white text-3xl z-10"
                onClick={() => setShowModal(false)}
              >
                <IoClose />
              </button>

              <img
                src="https://img.pikbest.com/backgrounds/20210418/green-theme-rent-a-car-web-banner-premium_5875128.jpg!sw800"
                alt="Poster Promo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
