import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const studentData = [
  { name: "Week 1", students: 520 },
  { name: "Week 2", students: 680 },
  { name: "Week 3", students: 750 },
  { name: "Week 4", students: 920 },
];

const revenueData = [
  { name: "Week 1", revenue: 0 },
  { name: "Week 2", revenue: 45 },
  { name: "Week 3", revenue: 100 },
  { name: "Week 4", revenue: 120 },
];

function OrgAdminDashboard() {
  const navigate = useNavigate();

  function goToStudents() {
    navigate("/orgadmin/students");
  }

  return (
    <div className="p-6 bg-white text-sm min-h-screen">
      <p className="text-gray-600 mb-6">
        Take a quick glance at everything happening in your Organization
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Published products */}
        <div className="bg-[#9D5CFF] text-white p-5 rounded-xl shadow border border-[#999999]">
          <p className="mb-1">Published products</p>
          <p className="text-2xl font-semibold">6</p>
        </div>

        {/* Registered accounts */}
        <div className="bg-white p-5 rounded-xl shadow border border-[#999999]">
          <p className="text-gray-600 mb-1">All registered accounts</p>
          <p className="text-2xl font-semibold">512</p>
          <div className="flex justify-end">
            <span
              onClick={goToStudents}
              className="text-violet-600 text-sm cursor-pointer hover:underline"
            >
              • Manage all students
            </span>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-5 rounded-xl shadow border border-[#999999]">
          <p className="text-gray-600 mb-1">Revenue (last 28 days)</p>
          <p className="text-2xl font-semibold">₹14600.00</p>
          <div className="flex justify-end">
            <span className="text-violet-600 text-sm cursor-pointer hover:underline">
              • See upcoming payouts
            </span>
          </div>
        </div>

        {/* Student Enrollment Trend */}
        <div className="bg-white p-5 rounded-xl shadow border border-[#999999] col-span-1 md:col-span-2 lg:col-span-1">
          <p className="text-gray-600 mb-4">Student enrollment trend</p>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis className="text-xs" dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill={"#9D5CFF"} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white p-5 rounded-xl shadow border border-[#999999] col-span-1 md:col-span-2 lg:col-span-1">
          <p className="text-gray-600 mb-4">Revenue trend</p>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis className="text-xs" dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#9D5CFF"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New messages in community */}
        <div className="bg-white p-5 rounded-xl shadow border border-[#999999]">
          <p className="text-gray-600 mb-3">New messages in community</p>
          <p className="text-lg font-semibold">
            <span className="text-pink-500 text-xl mr-1">•</span>#general
          </p>
          <p className="text-lg font-semibold">
            <span className="text-pink-500 text-xl mr-1">•</span>#Springboot-Dev
          </p>
          <p className="text-lg font-semibold">
            <span className="text-pink-500 text-xl mr-1">•</span>#Placements
          </p>
          <p className="text-lg font-semibold">
            <span className="text-pink-500 text-xl mr-1">•</span>#Java Feb-24
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrgAdminDashboard;
