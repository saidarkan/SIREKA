import { useParams } from "react-router-dom";
import customersData from "../Data/Customer.json";

export default function CustomerDetail() {
  const { id } = useParams();
  const customer = customersData.find(c => c.CustomerID === id);

  if (!customer) {
    return <div className="p-8">Customer tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Detail Pelanggan: {customer.CustomerName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p><strong>Email:</strong> {customer.Email}</p>
          <p><strong>Phone:</strong> {customer.Phone}</p>
        </div>
        <div>
          <p><strong>Total Rental:</strong> {customer.TotalRental}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`font-semibold ${customer.Status === "Active" ? "text-green-600" : "text-red-600"}`}>
              {customer.Status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
