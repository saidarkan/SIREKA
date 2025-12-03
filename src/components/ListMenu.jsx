import { SlBasket } from "react-icons/sl";
import { RiDashboardLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import {
  MdOutlineBusiness,
  MdBlock,
  MdHelpOutline,
  MdOutlineArticle,
  MdRateReview,
  MdOutlinePhotoLibrary
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

// Import icon booking
import { FaCalendarCheck } from "react-icons/fa6";
// Import icon inbox
import { FiMail } from "react-icons/fi";

export default function SidebarMenu() {
  return (
    <div className="w-full">
      {/* User Info */}
      <div className="flex items-center space-x-4">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Avatar"
          className="h-10 w-10 rounded-full"
        />
        <div>
          <h4 className="text-sm font-semibold text-white">Sirr Surya</h4>
          <p className="text-xs text-gray-400">HR Manager</p>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-10 space-y-1">
        <SidebarItem icon={<RiDashboardLine />} label="Dashboard" to="/" />
        <SidebarItem icon={<SlBasket />} label="CarList" to="/CarList" />
        <SidebarItem icon={<MdOutlineArticle />} label="Artikel / News" to="/artikel" />
        <SidebarItem icon={<FiMail />} label="Inbox" to="/inbox" />
        <SidebarItem icon={<BsPeople />} label="Customers" to="/customer" />
        <SidebarItem icon={<FaRegUser />} label="Driver" to="/driver" />
        <SidebarItem icon={<FaCalendarCheck />} label="Booking" to="/booking" />
        <SidebarItem icon={<MdOutlinePhotoLibrary />} label="Galeri" to="/galeri" />
        <SidebarItem icon={<AiOutlineUser />} label="List User" to="/ListUser" />
        <SidebarItem icon={<MdRateReview />} label="Testimoni" to="/testimoni" />
        <SidebarItem icon={<MdWorkOutline />} label="Vacancies" to="/lowongan" />
        <SidebarItem icon={<MdHelpOutline />} label="FAQ" to="/faq" />
        <SidebarItem icon={<BsPeople />} label="Team" to="/tim" />

        <div className="border-t border-gray-700 my-4"></div>

        <SidebarItem icon={<HiOutlineUserCircle />} label="Profile" to="/profile" />
        <SidebarItem icon={<FiSettings />} label="Setting" to="/setting" />

        <div className="border-t border-gray-700 my-4"></div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
          isActive
            ? "bg-green-500 text-white font-semibold"
            : "text-gray-400 hover:bg-green-500/20 hover:text-green-400"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
