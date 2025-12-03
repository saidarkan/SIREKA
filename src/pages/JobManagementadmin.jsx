import React from 'react';

const JobManagement = () => {
  const jobs = [
    { id: 1, title: 'Driver Freelance', location: 'Jakarta', status: 'Open' },
    { id: 2, title: 'Customer Service', location: 'Bandung', status: 'Closed' },
    { id: 3, title: 'Logistics Coordinator', location: 'Surabaya', status: 'Open' },
  ];

  return (
    <div className="p-6 bg-[#F4F5FA] min-h-screen text-[#0D0D0D]">
      <h1 className="text-3xl font-semibold mb-6 text-[#0D0D0D]">Vacancy Management</h1>

      <div className="mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          + Add Vacancy
        </button>
      </div>

      <div className="bg-black text-white rounded-lg overflow-hidden shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-[#1A1A1A] text-green-400">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Judul Lowongan</th>
              <th className="px-4 py-3 text-left">Lokasi</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job.id}
                className="border-t border-gray-700 hover:bg-[#1e1e1e] transition-all"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{job.title}</td>
                <td className="px-4 py-3">{job.location}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      job.status === 'Open' ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="text-blue-400 hover:underline">Edit</button>
                  <button className="text-red-400 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobManagement;
