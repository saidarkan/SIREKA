import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import PageHeader from "../components/PageHeader";
import EmployeeStats from "../components/EmployeeStats";
import bookingData from "../Data/gbooking.json";
import revenueData from "../Data/revenue.json";
import loginStats from "../Data/loginStats.json";
import articleStatsRaw from "../Data/articleStats.json";

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2025");

  const months = [
    "All", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
  ];
  const years = ["2022", "2023", "2024", "2025"];

  // Filter booking
  const filteredBooking = bookingData.filter(
    (b) =>
      (selectedMonth === "All" || b.month === selectedMonth) &&
      b.year === selectedYear
  );

  // Filter revenue
  const filteredRevenue = revenueData
    .map((r) => {
      const date = new Date(r.date);
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const monthName = months[monthIndex + 1];
      return {
        ...r,
        month: monthName,
        year: year.toString(),
      };
    })
    .filter(
      (r) =>
        (selectedMonth === "All" || r.month === selectedMonth) &&
        r.year === selectedYear
    )
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.month === curr.month);
      if (existing) {
        existing.revenue += curr.revenue;
      } else {
        acc.push({ month: curr.month, revenue: curr.revenue, year: curr.year });
      }
      return acc;
    }, []);

  // Filter login
  const filteredLogins = loginStats.filter(
    (l) =>
      (selectedMonth === "All" || l.month === selectedMonth) &&
      l.year === selectedYear
  );

  // Filter articles
  const filteredArticles = articleStatsRaw.find(
    (a) => a.year.toString() === selectedYear
  )?.articles || [];

  return (
    <div className="p-4 space-y-6">
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader pageTitle="Admin Dashboard" breadcrumb="Home" />

        <div className="flex gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <EmployeeStats />

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Booking Chart */}
        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Booking Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredBooking}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="booking"
                stroke="#00FF88"
                strokeWidth={2}
                dot={{ r: 5, fill: "#00FF88" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `Rp ${v / 1000000} jt`} />
              <Tooltip formatter={(v) => `Rp ${v.toLocaleString("id-ID")}`} />
              <Legend />
              <Bar dataKey="revenue" fill="#00FF88" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Login Stats Chart */}
        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">User Login Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredLogins}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="logins"
                stroke="#00FF88"
                strokeWidth={2}
                dot={{ r: 5, fill: "#00FF88" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Articles Chart */}
        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Popular Articles</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredArticles}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="title"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-15}
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#00FF88" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
