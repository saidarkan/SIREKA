import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import articles from "../Data/artikel.json";
import { motion } from "framer-motion";

const Artikel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newArticle, setNewArticle] = useState({
    title: "",
    author: "",
    date: "",
    category: "",
    status: "Draft",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    setData([...articles, ...storedArticles]);
  }, []);

  const filteredArticles = data.filter(
    (article) =>
      (article.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.author ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.category ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrEdit = () => {
    if (editingId !== null) {
      // Update artikel
      const updated = data.map((item) =>
        item.id === editingId
          ? { ...newArticle, id: editingId }
          : item
      );
      setData(updated);
      localStorage.setItem(
        "articles",
        JSON.stringify(updated.filter((a) => a.id > 10))
      );
    } else {
      // Tambah artikel baru
      const newId =
        data.length > 0
          ? Math.max(...data.map((a) => a.id)) + 1
          : 1;
      const updatedArticle = { ...newArticle, id: newId };
      const updated = [...data, updatedArticle];
      setData(updated);
      localStorage.setItem(
        "articles",
        JSON.stringify(updated.filter((a) => a.id > 10))
      );
    }

    // Reset form
    setNewArticle({
      title: "",
      author: "",
      date: "",
      category: "",
      status: "Draft",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (article) => {
    setNewArticle({
      title: article.title,
      author: article.author,
      date: article.date,
      category: article.category,
      status: article.status,
    });
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = data.filter((item) => item.id !== id);
    setData(updated);
    localStorage.setItem(
      "articles",
      JSON.stringify(updated.filter((a) => a.id > 10))
    );
  };

  const handleRowClick = (articleId) => {
    navigate(`/artikel/${articleId}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Daftar Artikel Rental
      </h1>

      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Cari artikel (judul, penulis, kategori)..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => {
            setNewArticle({
              title: "",
              author: "",
              date: "",
              category: "",
              status: "Draft",
            });
            setEditingId(null);
            setShowForm(true);
          }}
        >
          + Add Article
        </button>
      </div>

      {/* Form Tambah/Edit Artikel */}
      {showForm && (
        <div className="bg-white p-6 mb-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? "Edit Artikel" : "Tambah Artikel Baru"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Judul Artikel"
              className="border px-4 py-2 rounded"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Penulis"
              className="border px-4 py-2 rounded"
              value={newArticle.author}
              onChange={(e) =>
                setNewArticle({ ...newArticle, author: e.target.value })
              }
            />
            <input
              type="date"
              className="border px-4 py-2 rounded"
              value={newArticle.date}
              onChange={(e) =>
                setNewArticle({ ...newArticle, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Kategori"
              className="border px-4 py-2 rounded"
              value={newArticle.category}
              onChange={(e) =>
                setNewArticle({ ...newArticle, category: e.target.value })
              }
            />
            <select
              className="border px-4 py-2 rounded"
              value={newArticle.status}
              onChange={(e) =>
                setNewArticle({ ...newArticle, status: e.target.value })
              }
            >
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleAddOrEdit}
            >
              {editingId !== null ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto"
      >
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Judul Artikel</th>
              <th className="px-4 py-3">Penulis</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredArticles.map((article, i) => (
              <motion.tr
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-100 transition`}
              >
                <td
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleRowClick(article.id)}
                >
                  R{article.id.toString().padStart(3, "0")}
                </td>
                <td
                  className="px-4 py-3 font-medium cursor-pointer"
                  onClick={() => handleRowClick(article.id)}
                >
                  {article.title}
                </td>
                <td className="px-4 py-3">{article.author}</td>
                <td className="px-4 py-3">
                  {new Date(article.date).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3 capitalize">{article.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      article.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {article.status === "Published" ? "Publik" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
            {filteredArticles.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="py-4 px-4 text-center text-gray-400"
                >
                  Tidak ada artikel yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Artikel;
