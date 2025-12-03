import { useEffect, useState } from "react";
import driversData from "../Data/Driver.json";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newDriver, setNewDriver] = useState({
    DriverName: "",
    Email: "",
    Phone: "",
    LicenseNumber: "",
    Experience: "",
    Status: "Active"
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("drivers")) || [];
    setDrivers([...driversData, ...stored]);
  }, []);

  const sortBy = (key) => {
    const sorted = [...drivers].sort((a, b) => {
      const valA = (a[key] ?? "").toString().toLowerCase();
      const valB = (b[key] ?? "").toString().toLowerCase();
      return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
    setDrivers(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filtered = drivers.filter((d) =>
    (d.DriverName ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (editingId !== null) {
      // Edit
      const updated = drivers.map((d) =>
        d.DriverID === editingId
          ? { DriverID: editingId, ...newDriver }
          : d
      );
      setDrivers(updated);
      localStorage.setItem(
        "drivers",
        JSON.stringify(updated.filter((d) => d.DriverID > 10))
      );
    } else {
      // Add
      const newId =
        drivers.length > 0
          ? Math.max(...drivers.map((d) => d.DriverID || 0)) + 1
          : 1;
      const newItem = { DriverID: newId, ...newDriver };
      const updated = [...drivers, newItem];
      setDrivers(updated);
      localStorage.setItem(
        "drivers",
        JSON.stringify(updated.filter((d) => d.DriverID > 10))
      );
    }

    setNewDriver({
      DriverName: "",
      Email: "",
      Phone: "",
      LicenseNumber: "",
      Experience: "",
      Status: "Active"
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (driver) => {
    setNewDriver({
      DriverName: driver.DriverName,
      Email: driver.Email,
      Phone: driver.Phone,
      LicenseNumber: driver.LicenseNumber,
      Experience: driver.Experience,
      Status: driver.Status
    });
    setEditingId(driver.DriverID);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = drivers.filter((d) => d.DriverID !== id);
    setDrivers(updated);
    localStorage.setItem(
      "drivers",
      JSON.stringify(updated.filter((d) => d.DriverID > 10))
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Driver List
      </h1>

      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => {
            setNewDriver({
              DriverName: "",
              Email: "",
              Phone: "",
              LicenseNumber: "",
              Experience: "",
              Status: "Active"
            });
            setEditingId(null);
            setShowForm(true);
          }}
        >
          + Add Driver
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 mb-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? "Edit Driver" : "Add New Driver"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Driver Name"
              className="border px-4 py-2 rounded"
              value={newDriver.DriverName}
              onChange={(e) =>
                setNewDriver({ ...newDriver, DriverName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="border px-4 py-2 rounded"
              value={newDriver.Email}
              onChange={(e) =>
                setNewDriver({ ...newDriver, Email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              className="border px-4 py-2 rounded"
              value={newDriver.Phone}
              onChange={(e) =>
                setNewDriver({ ...newDriver, Phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="License Number"
              className="border px-4 py-2 rounded"
              value={newDriver.LicenseNumber}
              onChange={(e) =>
                setNewDriver({ ...newDriver, LicenseNumber: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Experience (years)"
              className="border px-4 py-2 rounded"
              value={newDriver.Experience}
              onChange={(e) =>
                setNewDriver({ ...newDriver, Experience: e.target.value })
              }
            />
            <select
              className="border px-4 py-2 rounded"
              value={newDriver.Status}
              onChange={(e) =>
                setNewDriver({ ...newDriver, Status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              onClick={handleSave}
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
                className="px-6 py-3 cursor-pointer"
                onClick={() => sortBy("DriverID")}
              >
                ID {sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => sortBy("DriverName")}
              >
                Name {sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">License</th>
              <th className="px-6 py-3">Experience</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((driver, i) => (
              <motion.tr
                key={driver.DriverID}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50 transition`}
              >
                <td className="px-6 py-4">{driver.DriverID}</td>
                <td className="px-6 py-4 text-green-700 hover:underline">
                  <Link to={`/drivers/${driver.DriverID}`}>
                    {driver.DriverName}
                  </Link>
                </td>
                <td className="px-6 py-4">{driver.Email}</td>
                <td className="px-6 py-4">{driver.Phone}</td>
                <td className="px-6 py-4">{driver.LicenseNumber}</td>
                <td className="px-6 py-4">
                  {driver.Experience} years
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      driver.Status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {driver.Status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(driver)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(driver.DriverID)}
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
