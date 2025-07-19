// components/StudentCard.jsx
import React from "react";
import { Link } from "react-router-dom";

function StudentCard({ student, index }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      {/* User Info */}
      <div className="mb-3">
        <h3 className="font-semibold text-base">{student.name}</h3>
        <p className="text-sm text-gray-600">{student.email}</p>
        <p className="text-sm text-gray-500">Joined on {student.joined}</p>
        <span
          className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
            student.status === "Active"
              ? "text-green-700 bg-green-100"
              : student.status === "Inactive"
              ? "text-gray-700 bg-gray-200"
              : "text-yellow-800 bg-yellow-100"
          }`}
        >
          {student.status}
        </span>
      </div>

      {/* Group Info */}
      <p className="italic text-gray-500 mb-2">Group: {student.groups}</p>

      {/* Activity Info */}
      <div className="mb-4">
        <p>{student.activity}</p>
        <p className="italic text-gray-500 text-sm">{student.bundle}</p>
        <Link to={`/orgadmin/students/${index}`}>
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
  );
}

export default StudentCard;
