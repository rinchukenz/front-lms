import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addInstructor,
  deleteInstructor,
  getInstructors,
  updateInstructor,
} from "../../services/OrgAdminService";
import { toast } from "react-toastify";

function CourseInstructors() {
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    bio: "",
    profileImageUrl: "",
  });
  const [instructors, setInstructors] = useState([]);
  const [editInstructorIndex, setEditInstructorIndex] = useState(null);
  const [showAddInstructor, setShowAddInstructor] = useState(false);

  const { cId } = useParams();

  const fetchInstructors = async () => {
    try {
      const response = await getInstructors(cId);
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, [cId]);

  const handleInstructorSubmit = async (e) => {
    e.preventDefault();
    if (
      !newInstructor.name ||
      !newInstructor.bio ||
      !newInstructor.profileImageUrl
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      if (editInstructorIndex !== null) {
        const instructorToUpdate = instructors[editInstructorIndex];
        const instructorId = instructorToUpdate.id;

        await updateInstructor(cId, instructorId, newInstructor);
        toast.success("Instructor updated successfully");
      } else {
        await addInstructor(cId, newInstructor);
        toast.success("Instructor added successfully");
      }

      setNewInstructor({ name: "", bio: "", profileImageUrl: "" });
      setShowAddInstructor(false);
      setEditInstructorIndex(null);
      fetchInstructors();
    } catch (error) {
      console.error("Error saving instructor:", error);
      toast.error("Failed to save instructor");
    }
  };

  const handleRemoveInstructor = async (instructorId) => {
    try {
      await deleteInstructor(cId, instructorId);
      fetchInstructors();
      toast.success("Instructor removed successfully");
    } catch (error) {
      console.error("Error removing instructor:", error);
      toast.error("Failed to remove instructor");
    }
  };
  return (
      <div className="mb-12 border-t border-[#A2A2A2] pt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Instructors</h2>
          {/* Add Instructor Button */}
          {!showAddInstructor && (
            <button
              onClick={() => {
                setShowAddInstructor(true);
                setEditInstructorIndex(null);
                setNewInstructor({ name: "", bio: "", profileImageUrl: "" });
              }}
              className="bg-violet-500 hover:bg-violet-600 hover:text-white text-xs font-bold cursor-pointer text-white px-6 py-2 rounded-md border shadow transition"
            >
              Add New Instructor
            </button>
          )}
        </div>

        {/* Existing Instructors */}
        {instructors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {instructors.map((instructor, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 px-5 py-4 border border-[#8B8B8B] rounded-lg bg-white transition"
              >
                <img
                  src={instructor.profileImageUrl}
                  alt={instructor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
                <div className="flex-grow items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => {
                      setEditInstructorIndex(idx);
                      setNewInstructor(instructor);
                      setShowAddInstructor(true);
                    }}
                    className=" hover:bg-orange-400 cursor-pointer text-xs hover:text-white border border-[#8B8B8B] px-2 py-1 rounded transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleRemoveInstructor(instructor.id)}
                    className=" hover:bg-red-600 cursor-pointer text-xs hover:text-white border border-[#8B8B8B] px-2 py-1 rounded transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add / Update Instructor Form */}
        {showAddInstructor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Add New Instructor</h2>
              <form onSubmit={handleInstructorSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newInstructor.name}
                    onChange={(e) =>
                      setNewInstructor((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Instructor name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows={3}
                    value={newInstructor.bio}
                    onChange={(e) =>
                      setNewInstructor((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Short bio"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    name="profileImageUrl"
                    value={newInstructor.profileImageUrl}
                    onChange={(e) =>
                      setNewInstructor((prev) => ({
                        ...prev,
                        profileImageUrl: e.target.value,
                      }))
                    }
                    className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-violet-600 cursor-pointer hover:bg-violet-700 text-white px-6 py-2 rounded-md"
                  >
                    {editInstructorIndex !== null
                      ? "Update Instructor"
                      : "Add Instructor"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddInstructor(false);
                      setEditInstructorIndex(null);
                      setNewInstructor({
                        name: "",
                        bio: "",
                        profileImageUrl: "",
                      });
                    }}
                    className=" hover:bg-gray-100 cursor-pointer px-6 py-2 border rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  );
}

export default CourseInstructors;
