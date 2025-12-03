import { useEffect, useState } from "react";
import inboxData from "../Data/inbox.json";
import { motion } from "framer-motion";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newMessage, setNewMessage] = useState({
    sender: "",
    subject: "",
    date: "",
    status: "Unread",
  });

  useEffect(() => {
    const storedInbox = JSON.parse(localStorage.getItem("inbox")) || [];
    setMessages([...inboxData, ...storedInbox]);
  }, []);

  const sortBy = (key) => {
    const sorted = [...messages].sort((a, b) => {
      const valA = (a[key] ?? "").toString().toLowerCase();
      const valB = (b[key] ?? "").toString().toLowerCase();
      return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
    setMessages(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filtered = messages.filter((msg) =>
    (msg.sender ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAddMessage = () => {
    if (editingId !== null) {
      // Update existing message
      const updatedMessages = messages.map((m) =>
        m.id === editingId ? { ...newMessage, id: editingId } : m
      );
      setMessages(updatedMessages);
      localStorage.setItem(
        "inbox",
        JSON.stringify(updatedMessages.filter((m) => m.id > 10))
      );
    } else {
      // Add new message
      const newId =
        messages.length > 0
          ? Math.max(...messages.map((m) => m.id || 0)) + 1
          : 1;
      const updatedMessage = { id: newId, ...newMessage };

      const updatedMessages = [...messages, updatedMessage];
      setMessages(updatedMessages);
      localStorage.setItem(
        "inbox",
        JSON.stringify(updatedMessages.filter((m) => m.id > 10))
      );
    }

    setNewMessage({
      sender: "",
      subject: "",
      date: "",
      status: "Unread",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (msg) => {
    setNewMessage({
      sender: msg.sender,
      subject: msg.subject,
      date: msg.date,
      status: msg.status,
    });
    setEditingId(msg.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updatedMessages = messages.filter((m) => m.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem(
      "inbox",
      JSON.stringify(updatedMessages.filter((m) => m.id > 10))
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Inbox</h1>

      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by sender..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => {
            setNewMessage({
              sender: "",
              subject: "",
              date: "",
              status: "Unread",
            });
            setEditingId(null);
            setShowForm(true);
          }}
        >
          + Add Message
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 mb-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? "Edit Message" : "Add New Message"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Sender"
              className="border px-4 py-2 rounded"
              value={newMessage.sender}
              onChange={(e) =>
                setNewMessage({ ...newMessage, sender: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Subject"
              className="border px-4 py-2 rounded"
              value={newMessage.subject}
              onChange={(e) =>
                setNewMessage({ ...newMessage, subject: e.target.value })
              }
            />
            <input
              type="date"
              className="border px-4 py-2 rounded"
              value={newMessage.date}
              onChange={(e) =>
                setNewMessage({ ...newMessage, date: e.target.value })
              }
            />
            <select
              className="border px-4 py-2 rounded"
              value={newMessage.status}
              onChange={(e) =>
                setNewMessage({ ...newMessage, status: e.target.value })
              }
            >
              <option value="Unread">Unread</option>
              <option value="Read">Read</option>
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
              onClick={handleAddMessage}
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
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => sortBy("sender")}
              >
                Sender {sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((msg, i) => (
              <motion.tr
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-100 transition cursor-pointer`}
              >
                <td className="px-4 py-3">{msg.sender}</td>
                <td className="px-4 py-3">{msg.subject}</td>
                <td className="px-4 py-3">{msg.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      msg.status === "Read"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {msg.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleEdit(msg)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
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
                  colSpan="5"
                  className="py-4 px-4 text-center text-gray-400"
                >
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
