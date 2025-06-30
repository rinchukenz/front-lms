import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AdminBulkRegistration() {
  const { orgId } = useParams();
  const navigate = useNavigate();

  const [admins, setAdmins] = useState([
    { name: "", email: "", password: "", phoneNumber: "" },
  ]);
  const [loading, setLoading] = useState(false);

  // Handle input changes for each admin by index
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAdmins = [...admins];
    updatedAdmins[index][name] = value;
    setAdmins(updatedAdmins);
  };

  // Add new empty admin row
  const addAdmin = () => {
    setAdmins([...admins, { name: "", email: "", password: "", phoneNumber: "" }]);
  };

  // Remove admin row by index
  const removeAdmin = (index) => {
    if (admins.length === 1) return; // at least one row must remain
    setAdmins(admins.filter((_, i) => i !== index));
  };

  // Submit all admins as bulk
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    for (const admin of admins) {
      if (!admin.name || !admin.email || !admin.password) {
        toast.error("Please fill all required fields for every admin.");
        return;
      }
    }

    const payload = admins.map(admin => ({
      ...admin,
      role: "ORG_ADMIN",
      organizationId: orgId,
    }));

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/admins/bulk-register", payload);
      toast.success("Admins registered successfully!");
      // Reset form
      setAdmins([{ name: "", email: "", password: "", phoneNumber: "" }]);
    } catch (err) {
      toast.error("Failed to register admins.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-xl shadow-md border border-blue-100 p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Bulk Admin Registration</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-sm bg-blue-100 font-bold text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
          >
            Go Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization ID (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization ID
            </label>
            <input
              type="text"
              value={orgId}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Admins input fields */}
          {admins.map((admin, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded p-4 relative space-y-4"
            >
              {admins.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAdmin(index)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
                  title="Remove admin"
                >
                  &times;
                </button>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  name="name"
                  type="text"
                  value={admin.name}
                  onChange={(e) => handleChange(index, e)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={admin.email}
                  onChange={(e) => handleChange(index, e)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  name="password"
                  type="password"
                  value={admin.password}
                  onChange={(e) => handleChange(index, e)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  type="tel"
                  value={admin.phoneNumber}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addAdmin}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
            >
              + Add Admin
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded text-white font-semibold ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } transition`}
            >
              {loading ? "Registering..." : "Register Admins"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminBulkRegistration;
