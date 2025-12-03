const stats = [
  {
    title: "Total Customer",
    value: 7000,
    label: "Customer",
    change: "~ 10.0%",
    changeType: "up",
  },
  {
    title: "Total rent ",
    value: 50000,
    label: "Rent",
    change: "~ 22.0%",
    changeType: "up",
  },
  {
    title: "Total Driver",
    value: 300,
    label: "Driver",
    change: "~ 12.0%",
    changeType: "up",
  },
  {
    title: "Total trusted by the Company ",
    value: 800,
    label: "Company",
    change: "~ 7.0%",
    changeType: "up",
  },
];

export default function EmployeeStats() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-black text-white border border-gray-700 rounded-xl p-5 relative transition-all duration-300
                     hover:bg-[#262626] hover:shadow-xl hover:shadow-green-400/40 hover:scale-[1.03] hover:border-green-500"
        >
          {/* Change tag */}
          <div
            className={`absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full ${
              stat.changeType === "up"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {stat.change}
          </div>

          {/* Title */}
          <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
          {/* Value */}
          <h2 className="text-2xl font-bold mt-1">{stat.value.toLocaleString()}</h2>
          {/* Label */}
          <p className="text-sm text-green-400 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
