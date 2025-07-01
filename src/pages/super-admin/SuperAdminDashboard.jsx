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
import { getRecentActivities, getTotalOrganizations, pendingCount } from "../../services/AdminService";

function SuperAdminDashboard() {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [orgCount, setOrgCount] = useState([]);
  const [pendingRequestsCount, setPendingRequestsCount] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    getActivities(0);
    OrganizationCount();
    getPendingRequests();
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

  const OrganizationCount = async () => {
    try {
      const response = await getTotalOrganizations();
      setOrgCount(response.data);
      console.log(orgCount);
    } catch (error) {
      console.error("Failed to fetch organization count:", error);
      setOrgCount(0);
    }
  }


  const getPendingRequests = async () => {
    try{
      const response = await pendingCount();
      setPendingRequestsCount(response.data);
    } catch (error) {
      console.error("Failed to fetch pending requests count:", error);
      setPendingRequestsCount([]);
    }
  }

  
  // Helper: Get visible page numbers (max 8)
  const getVisiblePages = (totalPages, currentPage, maxVisible = 8) => {
    let start = 0;
    let end = totalPages;

    if (totalPages <= maxVisible) {
      start = 0;
      end = totalPages;
    } else {
      if (currentPage <= Math.floor(maxVisible / 2)) {
        start = 0;
        end = maxVisible;
      } else if (currentPage >= totalPages - Math.ceil(maxVisible / 2)) {
        start = totalPages - maxVisible;
        end = totalPages;
      } else {
        start = currentPage - Math.floor(maxVisible / 2);
        end = start + maxVisible;
      }
    }

    return Array.from({ length: end - start }, (_, i) => i + start);
  };

  const stats = [
    { title: "Total Organizations", value: orgCount.totalOrganizations, className: "bg-gradient-to-b from-[#7022A3] to-[#9D5CFF] text-white" },
    { title: "Total Courses", value: 56 },
    { title: "Pending Requests", value: pendingRequestsCount.pendingOrgAdminRequests },
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
            className={`${stat.className} text-white p-5 rounded-xl shadow border border-[#999999]`}
          >
            <div className={`text-sm ${stat.className ? "text-white" : "text-black"}`}>{stat.title}</div>
            <div className={`text-4xl ${stat.className ? "text-white" : "text-black"} font-bold mt-2`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* All Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow p-4 border border-blue-100 flex flex-col">
          <h2 className="text-base font-semibold text-black mb-3">
            Recent Activities
          </h2>
          <ul className="space-y-1.5 text-black min-h-[150px] flex-grow">
            {activities.length === 0 ? (
              <li className="text-xs text-gray-500">No recent activities</li>
            ) : (
              activities.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-start text-xs md:text-sm leading-tight"
                >
                  <span className="text-base text-violet-500 leading-tight">•</span>
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
            <div
              className="mt-3 max-w-[75%] mx-auto py-1 px-2 flex items-center space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
              style={{
                scrollPaddingLeft: "10px",
                scrollSnapType: "x mandatory",
              }}
            >
              <button
                onClick={() => getActivities(Math.max(page - 1, 0))}
                disabled={page === 0}
                className={`flex-shrink-0 px-3 py-1 rounded text-xs cursor-pointer whitespace-nowrap ${
                  page === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-label="Previous page"
                style={{ scrollSnapAlign: "start" }}
              >
                «
              </button>

              {getVisiblePages(totalPages, page, 8).map((i) => (
                <button
                  key={i}
                  onClick={() => getActivities(i)}
                  className={`flex-shrink-0 px-2 py-0.5 text-xs cursor-pointer rounded whitespace-nowrap ${
                    i === page
                      ? "bg-violet-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-current={i === page ? "page" : undefined}
                  style={{ scrollSnapAlign: "start" }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => getActivities(Math.min(page + 1, totalPages - 1))}
                disabled={page === totalPages - 1}
                className={`flex-shrink-0 px-3 py-1 cursor-pointer rounded text-xs whitespace-nowrap ${
                  page === totalPages - 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-label="Next page"
                style={{ scrollSnapAlign: "start" }}
              >
                »
              </button>
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
              <XAxis className="text-sm" dataKey="name" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#9D5CFF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart
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
        </div> */}

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
                  <div className="text-xs text-gray-600">By: {issue.reportedBy}</div>
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
