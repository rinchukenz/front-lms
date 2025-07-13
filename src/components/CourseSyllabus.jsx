import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  addSection,
  deleteSection,
  getSections,
  publishSection,
  unpublishSection,
} from "../services/OrgAdminService";
import { toast } from "react-toastify";

function CourseSyllabus() {
  const { cId } = useParams();
  const { auth } = useAuth();

  const [sections, setSections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSection, setNewSection] = useState({
    courseId: cId,
    title: "",
    description: "",
    isPaid: false,
    isPublished: false,
    prerequisiteSectionIds: [],
    organizationId: auth.organizationId,
  });

  // ✅ Fetch Sections
  const fetchSections = async () => {
    try {
      const response = await getSections(cId);
      setSections(response.data);
      console.log("Fetched sections:", response.data);
    } catch (error) {
      console.error("Error fetching sections:", error);
      toast.error("Failed to fetch sections.");
    }
  };

  // ✅ Toggle Publish/Unpublish
  const handleTogglePublish = async (section) => {
    try {
      if (section.isPublished) {
        await unpublishSection(section.id);
        toast.success("Section Unpublished");
      } else {
        await publishSection(section.id);
        toast.success("Section Published");
      }
      fetchSections();
    } catch (error) {
      toast.error("Failed to toggle publish state");
      console.error("Publish toggle error:", error);
    }
  };

  // ✅ Open Modal
  const handleAddSectionClick = () => {
    setShowModal(true);
  };

  // ✅ Close Modal and Reset Form
  const handleModalClose = () => {
    setShowModal(false);
    setNewSection({
      courseId: cId,
      title: "",
      description: "",
      isPaid: false,
      isPublished: false,
      prerequisiteSectionIds: [],
      organizationId: auth.organizationId,
    });
  };

  // ✅ Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSection((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Submit New Section
  const handleSectionSubmit = async (e) => {
    e.preventDefault();

    if (!newSection.title.trim() || !newSection.description.trim()) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    try {
      await addSection(newSection);
      toast.success("Section added successfully!");
      fetchSections(); // Refresh the list
      handleModalClose();
    } catch (error) {
      console.error("Error adding section:", error);
      toast.error("Failed to add section.");
    }
  };

  const handleDeleteSection = async (section) => {
    try {
      console.log(section.id);
      await deleteSection(section.id);
      toast.success("Section deleted successfully");
      fetchSections();
    } catch (error) {
      toast.error("Failed to delete Section");
      console.error("Delete Section error:", error);
    }
  };

  // ✅ Load Sections on Mount
  useEffect(() => {
    if (cId) {
      fetchSections();
    }
  }, [cId]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Course Syllabus</h1>

      {/* ✅ Render Sections */}
      {sections.length === 0 ? (
        <p className="text-center text-gray-500">No sections added yet.</p>
      ) : (
        sections.map((section, index) => (
          <div
            key={index}
            className="mb-4 border rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold mb-1">{section.title}</h2>
              <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-lg cursor-pointer" onClick={() => handleDeleteSection(section)}>
                Delete
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-2">{section.description}</p>
            <p className="text-xs text-gray-500">
              Paid: {section.isPaid ? "Yes" : "No"} | Published:{" "}
              {section.isPublished ? "Yes" : "No"}
            </p>
            <button
              onClick={() => handleTogglePublish(section)}
              className={`text-xs px-3 py-1 mt-2 rounded-2xl cursor-pointer font-medium transition ${
                section.isPublished
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {section.isPublished ? "Unpublish" : "Publish"}
            </button>
          </div>
        ))
      )}

      {/* ✅ Add Section Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleAddSectionClick}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Section
        </button>
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Section</h2>

            <form onSubmit={handleSectionSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title *"
                value={newSection.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />

              <textarea
                name="description"
                placeholder="Description *"
                value={newSection.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPaid"
                    checked={newSection.isPaid}
                    onChange={handleInputChange}
                  />
                  Paid
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={newSection.isPublished}
                    onChange={handleInputChange}
                  />
                  Published
                </label>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseSyllabus;
