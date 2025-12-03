import SidebarMenu from "./ListMenu";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white flex flex-col justify-between h-full px-6 py-6">
      
      {/* Menu */}
      <div>
        <SidebarMenu />
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400">
        <strong>CarGO Admin</strong><br />
        &copy; 2025 All Rights Reserved
      </div>
    </aside>
  );
}
