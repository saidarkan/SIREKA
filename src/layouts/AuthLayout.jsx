import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className=" bg-white flex items-center justify-center">
      <div className="w-full  bg-white p-6 rounded-xl shadow-md">
  

        {/* Halaman Login/Register/Forgot Password */}
        <Outlet />

        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} CarGO. All rights reserved.
        </p>
      </div>
    </div>
  );
}
