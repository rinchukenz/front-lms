import React, { useState } from "react";

const dummyData = [
  { id: 1, name: "sujithra", username: "bsujithryurvsdy", date: "June 3rd, 2025", score: 267 },
  { id: 2, name: "Bhuvaneswari S", username: "bhuvis19mjuslob", date: "June 3rd, 2025", score: 290 },
  { id: 3, name: "Abirami", username: "abirami2004", date: "June 6th, 2025", score: 356 },
  { id: 4, name: "BHUVANESWARI P", username: "bhuvaneswari24", date: "June 4th, 2025", score: 345 },
  { id: 5, name: "Karthik", username: "karthik_007", date: "June 2nd, 2025", score: 310 },
  { id: 6, name: "Lakshmi", username: "lakshmi_lak", date: "June 1st, 2025", score: 280 },
  { id: 7, name: "Ramesh Kumar", username: "ramesh_k", date: "May 30th, 2025", score: 300 },
  { id: 8, name: "Priya", username: "priya_123", date: "June 6th, 2025", score: 340 },
  { id: 9, name: "Anand", username: "anand_g", date: "June 5th, 2025", score: 275 },
  { id: 10, name: "Divya", username: "divya_d", date: "June 4th, 2025", score: 320 },
];

const tabs = ["All Time", "This Month", "This Week", "Today"];

function Leaderboard() {
  const [activeTab, setActiveTab] = useState("All Time");
  const sortedData = [...dummyData].sort((a, b) => b.score - a.score);

  return (
    <div className="p-6 h-screen flex flex-col">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
              activeTab === tab
                ? "border-violet-500 text-violet-600"
                : "border-transparent text-gray-500 hover:text-violet-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table container */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100 flex flex-col flex-grow">
        {/* Table header */}
        <table className="min-w-full table-fixed text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="w-1/4 px-4 py-3 text-left">RANK</th>
              <th className="w-1/4 px-4 py-3 text-left">USER</th>
              <th className="w-1/4 px-4 py-3 text-left">MEMBER SINCE</th>
              <th className="w-1/4 px-4 py-3 text-left">SCORE</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable table body */}
        <div className="overflow-y-auto flex-grow">
          <table className="min-w-full table-fixed text-sm">
            <tbody>
              {sortedData.map((user, index) => (
                <tr key={user.id} className="border-t">
                  <td className="w-1/4 px-4 py-4">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                  </td>
                  <td className="w-1/4 px-4 py-4">
                    <div className="text-gray-800 font-semibold">{user.name}</div>
                    <div className="text-xs text-gray-500">@{user.username}</div>
                  </td>
                  <td className="w-1/4 px-4 py-4 text-gray-700">{user.date}</td>
                  <td className="w-1/4 px-4 py-4">
                    <span className="bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                      {user.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
