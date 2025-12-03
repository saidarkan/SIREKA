import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const showDropdown = () => {
    clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="bg-black text-white fixed top-0 w-full z-50 shadow-md">
      {/* Bar Atas */}
      <div className="bg-[#00C853] text-white text-sm py-2 px-4 flex justify-between items-center">
        <span>CarGO Trans siap membantu dengan sepenuh hati!</span>
        <span className="hidden sm:inline">📞 0813-1234-5678</span>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/img/logo.png" alt="Logo" className="w-15 h-7" />
          <h1 className="text-xl font-bold">
            <span >Car</span>
            <span className="text-green-500">GO</span>
          </h1>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-6 items-center text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-green-500"
                : "hover:text-green-400 transition"
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/tentang"
            className={({ isActive }) =>
              isActive
                ? "text-green-500"
                : "hover:text-green-400 transition"
            }
          >
            TENTANG KAMI
          </NavLink>
          <NavLink
            to="/mobil"
            className={({ isActive }) =>
              isActive
                ? "text-green-500"
                : "hover:text-green-400 transition"
            }
          >
            DAFTAR MOBIL
          </NavLink>

          {/* Dropdown */}
          <li
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
            className="relative"
          >
            <button className="flex items-center gap-1 hover:text-green-400 transition">
              INFO LAINNYA
              <svg
                className={`w-3 h-3 transform transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div
              className={`absolute top-full left-0 mt-2 w-48 bg-white text-black rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 z-50 ${
                dropdownOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              {[
                { to: "/artikel", text: "Artikel" },
                { to: "/faq", text: "FAQ" },
                { to: "/testimoni", text: "Testimoni" },
                { to: "/career", text: "Career" },
                { to: "/team", text: "Our Team" },
                { to: "/quotes", text: "Quotes" },
                { to: "/galeri", text: "Gallery" },
                { to: "/pricing", text: "Pricing" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="block px-4 py-3 hover:bg-green-50 hover:text-green-600 transition"
                >
                  {item.text}
                </NavLink>
              ))}
            </div>
          </li>

          <NavLink
            to="/kontak"
            className={({ isActive }) =>
              isActive
                ? "text-green-500"
                : "hover:text-green-400 transition"
            }
          >
            KONTAK
          </NavLink>

            <li>
  <NavLink
  to="/login"

  className="ml-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
>
  Login
</NavLink>

  </li>
          
        </ul>

        {/* Kontak Samping */}
        <div className="hidden md:flex flex-col text-right text-sm leading-tight">
          <span className="text-gray-400">Call Us Today!</span>
          <span className="text-green-500 font-semibold">0823-1216-3339</span>
        </div>
      </div>
    </header>
  );
}
