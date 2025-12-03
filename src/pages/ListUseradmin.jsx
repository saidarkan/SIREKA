import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://dummyjson.com/users");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers([...data.users, ...storedUsers]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const sortBy = (key) => {
    const sorted = [...users].sort((a, b) => {
      const valA = (a[key] ?? "").toString().toLowerCase();
      const valB = (b[key] ?? "").toString().toLowerCase();
      return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
    setUsers(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filtered = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (user.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      // Edit existing user
      const updatedUsers = users.map((u) =>
        u.id === editingId ? { ...formData, id: editingId } : u
      );
      setUsers(updatedUsers);
      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers.filter((u) => u.id > 100))
      );
    } else {
      // Add new user
      const newId =
        users.length > 0
          ? Math.max(...users.map((u) => u.id || 0)) + 1
          : 1;

      const newUser = {
        id: newId,
        ...formData,
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (user) => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((u) => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers.filter((u) => u.id > 100))
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">User List</h1>

      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search user..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => {
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
            });
            setEditingId(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close" : "+ Add User"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? "Edit User" : "Add New User"}
          </h2>
          <form onSubmit={handleAddUser} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 rounded"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              className="border p-2 rounded"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />

            <div className="col-span-2 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {editingId !== null ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto"
        >
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
              <tr>
                <th
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => sortBy("firstName")}
                >
                  Name {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-green-100 transition`}
                >
                  <td className="px-4 py-3">
                    {`${user.firstName} ${user.lastName}`}
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 px-4 text-center text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
