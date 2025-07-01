import React, { useState } from "react";
import { approveAdmin, deleteAdmin, rejectAdmin } from "../services/AdminService";

function AdminRequestCard({ id, name, email, organization, phone, approved, onActionComplete }) {
  const [status, setStatus] = useState(() => {
    if (approved === true) return "Approved";
    if (approved === false) return "Pending";
    return "Pending";
  });

  const handleApprove = async () => {
    try {
      await approveAdmin(id);
      setStatus("Approved");
      onActionComplete();
    } catch (error) {
      console.error("Failed to approve admin:", error);
      alert("Approval failed. Please try again.");
    }
  };

  const handleReject = async () => {
    try {
      await rejectAdmin(id);
      setStatus("Rejected");
      onActionComplete();
    } catch (error) {
      console.error("Failed to reject admin:", error);
      alert("Rejection failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAdmin(id);
      setStatus("Rejected");
      onActionComplete();
    } catch (error) {
      console.error("Failed to reject admin:", error);
      alert("Rejection failed. Please try again.");
    }
  };

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-violet-100 hover:shadow-lg transition">
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-violet-800 mb-1">{name}</h2>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Email:</strong> {email.length > 25 ? email.slice(0, 25) + "..." : email}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Phone:</strong> {phone}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Organization:</strong> {organization}
        </p>
        <p className="text-sm mt-2">
          <strong>Status:</strong>{" "}
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor[status]}`}
          >
            {status}
          </span>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleApprove}
          className="text-green-500 border border-gray-500 font-semibold cursor-pointer px-3 py-1 rounded text-sm"
        >
          Approve
        </button>
        <button
          onClick={handleReject}
          className="border border-gray-500 text-yellow-500 font-semibold cursor-pointer px-3 py-1 rounded text-sm"
        >
          Reject
        </button>
        <button
          onClick={handleDelete}
          className="border border-gray-500 text-red-600 font-semibold cursor-pointer px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminRequestCard;
