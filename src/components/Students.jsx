import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      <h3>Search by name or email</h3>
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-64"
        />
        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-black">
          Filter
        </button>
      </div>

      {/* Student Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* User Info */}
            <div className="mb-3">
              <h3 className="font-semibold text-base">{student.name}</h3>
              <p className="text-sm text-gray-600">{student.email}</p>
              <p className="text-sm text-gray-500">
                Joined on {student.joined}
              </p>
              <span className="inline-block mt-2 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                {student.status}
              </span>
            </div>

            {/* Group Info */}
            <p className="italic text-gray-500 mb-2">Group: {student.groups}</p>

            {/* Activity Info */}
            <div className="mb-4">
              <p>{student.activity}</p>
              <p className="italic text-gray-500 text-sm">{student.bundle}</p>
              <Link to={`/orgadmin/students/${student.idx}`}>
                <button className="mt-2 text-xs text-blue-600 hover:underline">
                  Open detailed activity
                </button>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button className="text-xs bg-white border border-gray-300 rounded px-3 py-1 hover:bg-gray-100">
                Modify email
              </button>
              <button className="text-xs bg-white border border-red-400 text-red-600 rounded px-3 py-1 hover:bg-red-50">
                Delete user
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;
