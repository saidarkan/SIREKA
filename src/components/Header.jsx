import { FaBell, FaSearch } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";

export default function Header() {
  function handleMenuChange(value) {
    if (value === "dashboard") {
      window.open("/", "_blank");
    } else if (value === "logout") {
      logout();
    }
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <header className="flex items-center justify-between bg-black text-white p-4 shadow-sm">
      {/* Brand & Search */}
      <div className="flex items-center gap-6 w-full">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <img src="/img/logo.png" alt="Logo" className="w-16 h-8" />
          <h1 className="text-2xl font-bold">
            Car<span className="text-green-500">GO</span>
          </h1>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pr-10 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Action Menu */}
      <div className="flex items-center gap-4 relative">
        {/* User Dropdown */}
        <div className="relative group">
          <button className="p-2 bg-gray-500 rounded-full hover:bg-green-500/40 transition">
            <HiOutlineUser className="text-xl text-white" />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-200 z-50">
            <button
              onClick={() => handleMenuChange("dashboard")}
              className="block w-full text-left px-4 py-2 hover:bg-green-500/20 transition"
            >
              Go To Dashboard
            </button>
            <button
              onClick={() => handleMenuChange("logout")}
              className="block w-full text-left px-4 py-2 hover:bg-green-500/20 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Notification */}
        <div className="p-3 bg-gray-800 rounded-2xl cursor-pointer hover:shadow-md transition">
          <FaBell className="text-white" />
        </div>
      </div>
    </header>
  );
}
