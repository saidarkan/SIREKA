import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";
import logo from "../../public/img/logo.png";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-10 px-6 text-sm">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Logo & Socials */}
        <div>
          <img src={logo} alt="Logo Bali 88 Trans" className="w-32 mb-4" />
          <p className="text-gray-400 mb-6">
            "Your Travel Partner" - Mitra perjalanan terbaik Anda untuk pengalaman menjelajah Bali yang aman dan berkesan.
          </p>
          <div className="flex gap-4 text-lg text-white">
            <FaFacebookF className="hover:text-green-400 cursor-pointer" />
            <FaInstagram className="hover:text-green-400 cursor-pointer" />
            <FaPinterestP className="hover:text-green-400 cursor-pointer" />
            <FaYoutube className="hover:text-green-400 cursor-pointer" />
          </div>
        </div>

        {/* Home */}
        <div>
          <h4 className="font-bold text-white mb-4">Home</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Colour</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">Inspiration</li>
            <li className="hover:text-white cursor-pointer">Support</li>
            <li className="hover:text-white cursor-pointer">Professional</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Find a Painter</li>
            <li className="hover:text-white cursor-pointer">Find a Store</li>
            <li className="hover:text-white cursor-pointer">Dulux Colour Designers</li>
            <li className="hover:text-white cursor-pointer">Help & Advice</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="font-bold text-white mb-4">About Us</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Manage My Account</li>
            <li className="hover:text-white cursor-pointer">News & Media</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Colour Accuracy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-700 pt-6 flex flex-wrap justify-center gap-6 text-gray-400">
        <span className="hover:text-white cursor-pointer">FAQs & Returns</span>
        <span className="hover:text-white cursor-pointer">Careers</span>
        <span className="hover:text-white cursor-pointer">Privacy Policy</span>
        <span className="hover:text-white cursor-pointer">Corporate Info</span>
        <span className="hover:text-white cursor-pointer">Recommended Sites</span>
        <span className="hover:text-white cursor-pointer">News & Media</span>
        <span className="hover:text-white cursor-pointer">Site Terms</span>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-gray-600">
        &copy; {new Date().getFullYear()} Bali 88 Trans. All rights reserved.
      </div>
    </footer>
  );
}