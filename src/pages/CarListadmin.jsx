import { useEffect, useState } from "react";
import { MobilAPI } from "../services/mobilAPI";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    year: "",
    price_per_day: "",
    specifications: { seats: "", transmission: "" },
    availability: true,
  });

  const navigate = useNavigate();

  // Load data mobil dari API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await MobilAPI.fetchAll();
        setCars(data);
      } catch (err) {
        console.error("Gagal fetch mobil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Sortir
  const sortBy = (key) => {
    const sorted = [...cars].sort((a, b) => {
      const valA = (a[key] ?? "").toString().toLowerCase();
      const valB = (b[key] ?? "").toString().toLowerCase();
      return sortOrder === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
    });
    setCars(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter by brand
  const filtered = cars.filter((car) =>
    (car.brand ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // Simpan/Update mobil
  const handleSaveCar = async () => {
    try {
      if (editingCar) {
        // Update
        const updated = await MobilAPI.update(editingCar.id, newCar);
        setCars(cars.map((c) => (c.id === editingCar.id ? updated[0] : c)));
      } else {
        // Tambah
        const created = await MobilAPI.create(newCar);
        setCars([...cars, created[0]]);
      }
    } catch (err) {
      console.error("Gagal simpan mobil:", err);
    } finally {
      setShowForm(false);
      setEditingCar(null);
      setNewCar({
        brand: "",
        model: "",
        year: "",
        price_per_day: "",
        specifications: { seats: "", transmission: "" },
        availability: true,
      });
    }
  };

  // Edit mobil
  const handleEdit = (car) => {
    setEditingCar(car);
    setNewCar({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price_per_day: car.price_per_day,
      specifications: { ...car.specifications },
      availability: car.availability,
    });
    setShowForm(true);
  };

  // Hapus mobil
  const handleDelete = async (id) => {
    try {
      await MobilAPI.delete(id);
      setCars(cars.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Gagal hapus mobil:", err);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Car List</h1>

      <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search car by brand..."
          className="w-full md:w-1/3 px-4 py-2 border rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg"
          onClick={() => {
            setNewCar({
              brand: "",
              model: "",
              year: "",
              price_per_day: "",
              specifications: { seats: "", transmission: "" },
              availability: true,
            });
            setEditingCar(null);
            setShowForm(true);
          }}
        >
          + Add Car
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 mb-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingCar ? "Edit Car" : "Add New Car"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Brand"
              value={newCar.brand}
              onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
            />
            <input
              type="text"
              placeholder="Model"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            />
            <input
              type="number"
              placeholder="Year"
              value={newCar.year}
              onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price per day"
              value={newCar.price_per_day}
              onChange={(e) =>
                setNewCar({ ...newCar, price_per_day: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Seats"
              value={newCar.specifications.seats}
              onChange={(e) =>
                setNewCar({
                  ...newCar,
                  specifications: { ...newCar.specifications, seats: e.target.value },
                })
              }
            />
            <input
              type="text"
              placeholder="Transmission"
              value={newCar.specifications.transmission}
              onChange={(e) =>
                setNewCar({
                  ...newCar,
                  specifications: { ...newCar.specifications, transmission: e.target.value },
                })
              }
            />
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => {
                setShowForm(false);
                setEditingCar(null);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleSaveCar}
            >
              {editingCar ? "Update" : "Save"}
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
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 cursor-pointer" onClick={() => sortBy("brand")}>
                Brand {sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Price (Rp/day)</th>
              <th className="px-4 py-3">Seats</th>
              <th className="px-4 py-3">Transmission</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((car, i) => (
              <motion.tr
                key={car.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-100`}
              >
                <td className="px-4 py-3 cursor-pointer" onClick={() => navigate(`/cars/${car.id}`)}>
                  {car.brand}
                </td>
                <td className="px-4 py-3">{car.model}</td>
                <td className="px-4 py-3">{car.year}</td>
                <td className="px-4 py-3">Rp{parseInt(car.price_per_day).toLocaleString()}</td>
                <td className="px-4 py-3">{car.specifications?.seats ?? "-"}</td>
                <td className="px-4 py-3">{car.specifications?.transmission ?? "-"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      car.availability ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {car.availability ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(car)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(car.id)}
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
