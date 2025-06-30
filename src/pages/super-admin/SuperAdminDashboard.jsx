import React from "react";
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

function SuperAdminDashboard() {
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

  const activities = [
    "Admin John approved Org Alpha",
    "User Alice enrolled in React",
    "New course 'DevOps' added",
    "System maintenance scheduled",
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
    "#3B82F6", // Blue
    "#F59E0B", // Amber
    "#10B981", // Green
    "#EC4899", // Pink
    "#6366F1", // Indigo
    "#F43F5E", // Rose
  ];

  const BAR_COLOR = "#60A5FA";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 bg-gray-300 min-h-screen">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="text-black text-sm">{stat.title}</div>
            <div className="text-4xl font-bold text-blue-800 mt-2">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* All Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-black mb-4">
            Recent Activities
          </h2>
          <ul className="space-y-3 text-black">
            {activities.map((activity, index) => (
              <li
                key={index}
                className="flex items-start text-sm md:text-base hover:translate-x-1 transition-transform duration-200 ease-in-out"
              >
                <span className="text-lg text-blue-500">•</span>
                <span className="ml-2">{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Line Graph */}
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
                stroke="#22C55E" // Green line
                strokeWidth={3}
                dot={{ r: 5, fill: "#4ADE80" }} // Light green dots
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Graph */}
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
              <Bar
                dataKey="students"
                fill="#22C55E" // Green bar fill
                radius={[6, 6, 0, 0]}
              />
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
