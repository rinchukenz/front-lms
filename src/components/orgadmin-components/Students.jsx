import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentCard from "./StudentCard";

const sampleStudents = [
  {
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    joined: "June 18th, 2025",
    status: "Suspended",
    groups: "Not in any group",
    activity: "0 of 13 courses accessible",
    bundle: "No course bundle accessible",
  },
  {
    name: "Amit Kulkarni",
    email: "amit.kulkarni@example.com",
    joined: "June 17th, 2025",
    status: "Active",
    groups: "Full Stack Batch A",
    activity: "4 of 13 courses accessible",
    bundle: "1 bundle active",
  },
  {
    name: "Lavanya Krishnan",
    email: "lavanya.krishnan@example.com",
    joined: "June 16th, 2025",
    status: "Active",
    groups: "UI/UX Learners",
    activity: "6 of 13 courses accessible",
    bundle: "2 bundles active",
  },
  {
    name: "Karan Mehta",
    email: "karan.mehta@example.com",
    joined: "June 15th, 2025",
    status: "Inactive",
    groups: "Not in any group",
    activity: "1 of 13 courses accessible",
    bundle: "No course bundle accessible",
  },
  {
    name: "Darshan G N",
    email: "darshan.g.n181903@gmail.com",
    joined: "June 23rd, 2025",
    status: "Active",
    groups: "Not in any group",
    activity: "2 of 13 courses accessible",
    bundle: "No course bundle accessible",
  },
  {
    name: "Chetana Sangappa Hebli",
    email: "chetanaheblis@gmail.com",
    joined: "June 23rd, 2025",
    status: "Active",
    groups: "Not in any group",
    activity: "2 of 13 courses accessible",
    bundle: "No course bundle accessible",
  },
  {
    name: "Konduru Mounika",
    email: "mounika@gmail.com",
    joined: "June 23rd, 2025",
    status: "Active",
    groups: "Not in any group",
    activity: "3 of 13 courses accessible",
    bundle: "1 bundle active",
  },
  {
    name: "Aditya Sharma",
    email: "aditya.sharma@example.com",
    joined: "June 21st, 2025",
    status: "Inactive",
    groups: "Frontend Enthusiasts",
    activity: "0 of 13 courses accessible",
    bundle: "No course bundle accessible",
  },
  {
    name: "Priya Iyer",
    email: "priya.iyer@example.com",
    joined: "June 20th, 2025",
    status: "Active",
    groups: "Java Beginners",
    activity: "5 of 13 courses accessible",
    bundle: "1 bundle active",
  },
  {
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    joined: "June 19th, 2025",
    status: "Active",
    groups: "React Developers",
    activity: "7 of 13 courses accessible",
    bundle: "2 bundles active",
  },
  {
    name: "Divya Singh",
    email: "divya.singh@example.com",
    joined: "June 14th, 2025",
    status: "Active",
    groups: "JavaScript Warriors",
    activity: "8 of 13 courses accessible",
    bundle: "2 bundles active",
  },
  {
    name: "Nikhil Patil",
    email: "nikhil.patil@example.com",
    joined: "June 13th, 2025",
    status: "Active",
    groups: "Data Structures Group",
    activity: "3 of 13 courses accessible",
    bundle: "1 bundle active",
  },
  {
    name: "Megha Desai",
    email: "megha.desai@example.com",
    joined: "June 12th, 2025",
    status: "Active",
    groups: "Backend Devs",
    activity: "4 of 13 courses accessible",
    bundle: "1 bundle active",
  },
];

function Students() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredStudents = sampleStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-sm text-gray-800">
      <h2 className="text-lg font-semibold mb-4">
        Manage all Students on your Organization from here
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-64"
        />
        
      </div>

      {/* View mode toggle */}
      <div className="mb-6 flex items-center gap-4">
        <span className="font-medium text-gray-700">View Mode:</span>
        <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 text-sm font-medium ${
              viewMode === "grid"
                ? "bg-violet-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 text-sm font-medium ${
              viewMode === "table"
                ? "bg-violet-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Students */}

      {viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student, idx) => (
            <StudentCard key={idx} student={student} index={idx} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3 space-x-2">
                    <Link to={`/orgadmin/students/${idx}`}>
                      <button className="text-xs text-blue-600 hover:underline">
                        View Activity
                      </button>
                    </Link>
                    <button className="text-xs text-gray-700 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
                      Modify Email
                    </button>
                    <button className="text-xs text-red-600 border border-red-400 rounded px-2 py-1 hover:bg-red-50">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Students;
