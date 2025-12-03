import { useEffect, useState } from "react";
import galleryData from "../Data/galeri.json";
import { motion } from "framer-motion";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newItem, setNewItem] = useState({
    title: "",
    category: "Image",
    url: "",
    description: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gallery")) || [];
    setGallery([...galleryData, ...stored]);
  }, []);

  useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(gallery.filter(g => g.id > 10)));
  }, [gallery]);

  const sortBy = (key) => {
    const sorted = [...gallery].sort((a, b) => {
      const valA = a[key]?.toString().toLowerCase();
      const valB = b[key]?.toString().toLowerCase();
      return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
    setGallery(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleAdd = () => {
    const newId = gallery.length + 1;
    const item = { id: newId, ...newItem };
    const updated = [...gallery, item];
    setGallery(updated);
    setShowForm(false);
    setNewItem({ title: "", category: "Image", url: "", description: "" });
  };

  const handleEdit = (id) => {
    const item = gallery.find((g) => g.id === id);
    setNewItem(item);
    setEditingId(id);
    setShowForm(true);
  };

  const handleUpdate = () => {
    const updated = gallery.map((g) => (g.id === editingId ? { ...newItem, id: editingId } : g));
    setGallery(updated);
    setShowForm(false);
    setEditingId(null);
    setNewItem({ title: "", category: "Image", url: "", description: "" });
  };

  const handleDelete = (id) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gallery Management</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="ml-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => setShowForm(true)}
        >
          + Add Media
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 mb-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Media" : "Add Media"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Title" className="border px-4 py-2 rounded" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />
            <select className="border px-4 py-2 rounded" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
              <option value="Image">Image</option>
              <option value="Video">Video</option>
            </select>
            <input type="text" placeholder="URL" className="border px-4 py-2 rounded" value={newItem.url} onChange={(e) => setNewItem({ ...newItem, url: e.target.value })} />
            <input type="text" placeholder="Description" className="border px-4 py-2 rounded col-span-2" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={editingId ? handleUpdate : handleAdd}>Save</button>
          </div>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <tr>
              <th className="px-4 py-3 cursor-pointer" onClick={() => sortBy("title")}>Title {sortOrder === "asc" ? "↑" : "↓"}</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {gallery.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())).map((item, i) => (
              <motion.tr key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50 transition`}>
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">
                  {item.category === "Image" ? (
                    <img src={item.url} alt={item.title} className="w-20 rounded" />
                  ) : (
                    <video src={item.url} className="w-32 rounded" controls />
                  )}
                </td>
                <td className="px-4 py-3">{item.description}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:underline mr-2" onClick={() => handleEdit(item.id)}>Edit</button>
                  <button className="text-red-600 hover:underline" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
