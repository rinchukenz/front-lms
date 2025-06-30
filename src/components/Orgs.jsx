import React, { useEffect, useState } from "react";
import { activateOrg, deleteOrg, getAllOrgs, suspendOrg } from "../services/AdminService";
import { Link } from "react-router-dom";

function Orgs() {
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getOrganizations();
  }, []);

  const getOrganizations = () => {
    getAllOrgs()
      .then((response) => {
        setOrganizations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleActivate = async (orgId) => {
    try {
      await activateOrg(orgId);
      getOrganizations();
    } catch (error) {
      console.error("Activation failed", error);
    }
  };

  const handleDeactivate = async (orgId) => {
    try {
      await suspendOrg(orgId);
      getOrganizations();
    } catch (error) {
      console.error("Deactivation failed", error);
    }
  };

  const handleDelete = async (orgId) => {
    try{
      await deleteOrg(orgId);
      getOrganizations();
    } catch (error) {
      console.error("Deletion failed", error);
    }
  };

  const filteredOrgs = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center m-6">
        <Link to="/superadmin/organizations/addorg">
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold px-4 py-2 rounded-lg shadow">
            + Add Organization
          </button>
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or domain..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-black"
        />
      </div>

      {filteredOrgs.length === 0 ? (
        <p className="text-gray-500 text-center">No organizations found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrgs.map((org, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between border border-blue-100 hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  {org.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Domain:</strong> {org.domain}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>License:</strong> {org.licenseType}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Max Admins:</strong> {org.maxAdmins}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Max Students:</strong> {org.maxStudents}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      org.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {org.isActive ? "Active" : "Inactive"}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Created:</strong>{" "}
                  {new Date(org.createdAt).toLocaleDateString()}{" "}
                  <span className="block sm:inline">
                    {new Date(org.createdAt).toLocaleTimeString()}
                  </span>
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleActivate(org.id)}
                  className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-1 rounded text-sm"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleDeactivate(org.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-3 py-1 rounded text-sm"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleDelete(org.id)}
                  className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
                <Link to={`/superadmin/organizations/addadmin/${org.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-3 py-1 rounded text-sm">
                    Add Admin
                  </button>
                </Link>
                <Link to={`/superadmin/organizations/addadmin-bulk/${org.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-3 py-1 rounded text-sm">
                    Admin Bulk
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orgs;
