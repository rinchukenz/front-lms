import React, { useEffect, useState } from "react";
import AdminRequestCard from "./AdminRequestCard";
import { getAllAdmins } from "../../services/AdminService";

function AdminRequests() {
  const [adminRequests, setAdminRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAdminRequests();
  }, []);

  const getAdminRequests = () => {
    getAllAdmins()
      .then((response) => {
        setAdminRequests(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch admin requests:", error);
      });
  };

  // Filter by name or email
  const filteredRequests = adminRequests.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.organizationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="my-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          No admin requests found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((item) => (
            <AdminRequestCard
              key={item.id}
              id={item.id}
              name={item.name}
              email={item.email}
              organization={item.organizationName}
              phone={item.phoneNumber}
              approved={item.approved}
              onActionComplete={getAdminRequests}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminRequests;
