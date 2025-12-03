// src/pages/DriverDetail.jsx
import { useParams } from "react-router-dom";
import driversData from "../Data/Driver.json";

export default function DriverDetail() {
  const { id } = useParams();
  const driver = driversData.find((d) => d.DriverID.toString() === id);

  if (!driver) {
    return <div className="p-8">Driver not found.</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Driver Detail - {driver.DriverName}
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p><strong>ID:</strong> {driver.DriverID}</p>
        <p><strong>Name:</strong> {driver.DriverName}</p>
        <p><strong>Email:</strong> {driver.Email}</p>
        <p><strong>Phone:</strong> {driver.Phone}</p>
        <p><strong>License:</strong> {driver.LicenseNumber}</p>
        <p><strong>Experience:</strong> {driver.Experience} years</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`font-semibold ${driver.Status === "Active" ? "text-green-600" : "text-red-600"}`}>
            {driver.Status}
          </span>
        </p>
      </div>
    </div>
  );
}
