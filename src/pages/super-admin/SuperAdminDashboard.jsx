import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getRecentActivities } from "../../services/AdminService";

function SuperAdminDashboard() {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    getActivities(0);
  }, []);

  const getActivities = async (pageNum = 0) => {
    try {
      const response = await getRecentActivities(pageNum, pageSize);
      setActivities(response.data.content || []);
      setTotalPages(response.data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      setActivities([]);
    }
  };

  const stats = [
    { title: "Total Organizations", value: 12 },
    { title: "Total Courses", value: 128 },
    { title: "Pending Requests", value: 6 },
    { title: "Registered Users", value: 945 },
  ];

  const courseData = [
    { name: "Java", students: 300 },
    { name: "React", students: 420 },
    { name: "Spring Boot", students: 280 },
    { name: "Python", students: 500 },
    { name: "DevOps", students: 220 },
  ];

  const categoryData = [
    { name: "Development", value: 50 },
    { name: "Design", value: 30 },
    { name: "Marketing", value: 20 },
  ];

  const userGrowthData = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 250 },
    { month: "Mar", users: 310 },
    { month: "Apr", users: 400 },
    { month: "May", users: 520 },
    { month: "Jun", users: 610 },
  ];

  const issues = [
    { title: "Login bug", status: "Open", reportedBy: "Student A" },
    {
      title: "Exam timer glitch",
      status: "In Progress",
      reportedBy: "Instructor B",
    },
    {
      title: "Certificate not generated",
      status: "Resolved",
      reportedBy: "Org Admin",
    },
  ];

  const PIE_COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#10B981",
    "#EC4899",
    "#6366F1",
    "#F43F5E",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 bg-white min-h-screen">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="text-white p-5 rounded-xl shadow border border-[#999999]"
          >
            <div className="text-black text-sm">{stat.title}</div>
            <div className="text-4xl font-bold text-black mt-2">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* All Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow p-4 border border-blue-100">
          <h2 className="text-base font-semibold text-black mb-3">
            Recent Activities
          </h2>
          <ul className="space-y-1.5 text-black min-h-[150px]">
            {activities.length === 0 ? (
              <li className="text-xs text-gray-500">No recent activities</li>
            ) : (
              activities.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-start text-xs md:text-sm leading-tight"
                >
                  <span className="text-base text-violet-500 leading-tight">
                    •
                  </span>
                  <span className="ml-2">
                    {activity.action} –{" "}
                    <span className="text-[10px] text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </span>
                </li>
              ))
            )}
          </ul>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-3 space-x-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => getActivities(i)}
                  className={`px-2 py-0.5 text-xs rounded ${
                    i === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-black mb-4">
            Monthly User Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <XAxis dataKey="month" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#9D5CFF"
                strokeWidth={3}
                dot={{ r: 5, fill: "#9D5CFF" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-black mb-4">
            Course Enrollments
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseData}>
              <XAxis dataKey="name" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#9D5CFF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-black mb-4">
            Course Categories
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Reported Issues */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-black mb-4">
            Reported Issues
          </h2>
          <ul className="space-y-4">
            {issues.map((issue, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-blue-50 border border-blue-200 rounded-lg p-3"
              >
                <div>
                  <div className="font-medium text-black">{issue.title}</div>
                  <div className="text-xs text-gray-600">
                    By: {issue.reportedBy}
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    issue.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : issue.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {issue.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
