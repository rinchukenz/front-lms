import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  addContent,
  addSection,
  deleteContent,
  deleteSection,
  getContents,
  getSections,
  publishContent,
  publishSection,
  unpublishContent,
  unpublishSection,
  // You can implement addContent in OrgAdminService
} from "../services/OrgAdminService";
import { toast } from "react-toastify";
import { Plus, Section } from "lucide-react";

function CourseSyllabus() {
  const { cId } = useParams();
  const { auth } = useAuth();

  const [sections, setSections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  const [newSection, setNewSection] = useState({
    courseId: cId,
    title: "",
    description: "",
    isPaid: false,
    isPublished: false,
    prerequisiteSectionIds: [],
    organizationId: auth.organizationId,
  });

  const [contentFormData, setContentFormData] = useState({
    title: "",
    description: "",
    contentType: "",
    videoUrl: "",
    thumbnailUrl: "",
    duration: 0,
    startTime: "",
    endTime: "",
    isPublished: false,
    isGlobal: false,
  });

  const [contents, setContents] = useState([]);

  const fetchContents = async () => {
    try {
      const response = await getContents(cId);
      setContents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  console.log(contents);

  const fetchSections = async () => {
    try {
      const response = await getSections(cId);
      setSections(response.data);
    } catch (error) {
      toast.error("Failed to fetch sections.");
    }
  };

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
    }
  };

  const handleAddSectionClick = () => setShowModal(true);

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

  const handleOpenContentModal = (sectionId) => {
    setSelectedSectionId(sectionId);
    setContentFormData({
      title: "",
      description: "",
      contentType: "",
      videoUrl: "",
      thumbnailUrl: "",
      duration: 0,
      startTime: "",
      endTime: "",
      isPublished: false,
      isGlobal: false,
    });
    setShowContentModal(true);
  };

  const handleCloseContentModal = () => {
    setShowContentModal(false);
    setSelectedSectionId(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSection((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    if (!newSection.title.trim() || !newSection.description.trim()) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    try {
      await addSection(newSection);
      toast.success("Section added successfully!");
      fetchSections();
      handleModalClose();
    } catch (error) {
      toast.error("Failed to add section.");
    }
  };

  const handleDeleteSection = async (section) => {
    try {
      await deleteSection(section.id);
      toast.success("Section deleted successfully");
      fetchSections();
    } catch (error) {
      toast.error("Failed to delete Section");
    }
  };

  const handleContentInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContentFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...contentFormData,
      organizationId: auth.organizationId,
      courseId: cId,
      sectionId: selectedSectionId,
    };
    //console.log("Submit Content Payload →", payload);
    try {
      const response = await addContent(payload);
      toast.success("Content added successfully!");
      fetchContents();
      console.log(response);
    } catch (error) {
      toast.error("Failed to add content.");
    }
    fetchSections();
    handleCloseContentModal();
  };

  const handleDeleteContent = async (contentId) => {
    try {
      await deleteContent(contentId);
      toast.success("Content deleted successfully");
      fetchContents();
    } catch (error) {
      toast.error("Failed to delete content");
    }
  };

  const handleTogglePublishContent = async (content) => {
    try {
      if (content.isPublished) {
        await unpublishContent(content.id);
        toast.success("Content Unpublished");
      } else {
        await publishContent(content.id);
        toast.success("Content Published");
      }
      fetchContents();
    } catch (error) {
      toast.error("Failed to toggle publish state");
      console.error("Publish toggle error:", error);
    }
  };

  useEffect(() => {
    if (cId) fetchSections();
    fetchContents();
  }, [cId]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Course Syllabus</h1>

      {sections.length === 0 ? (
        <p className="text-center text-gray-500">No sections added yet.</p>
      ) : (
        sections.map((section) => (
          <div
            key={section.id}
            className="mb-4 border border-dashed rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold mb-1">{section.title}</h2>
              <button
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-lg"
                onClick={() => handleDeleteSection(section)}
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-2">{section.description}</p>
            <p className="text-xs text-gray-500">
              Paid: {section.isPaid ? "Yes" : "No"} | Published:{" "}
              {section.isPublished ? "Yes" : "No"}
            </p>

            {/* Content */}
            {contents.map((content) => (
              // <Content
              //   key={content.id}
              //   title={content.title}
              //   type={content.contentType}
              //   delete={handleDeleteContent}
              // />
              <div className="bg-white flex justify-between p-4 rounded-lg shadow-md border m-2 border-gray-200 w-full">
                <h1>{content.title}</h1>
                <p className="text-gray-600 text-sm">{content.contentType}</p>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <span className="block font-semibold text-gray-800">
                    Published:
                  </span>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-gray-600">
                      {content.isPublished ? "Yes" : "No"}
                    </span>
                    <button
                      onClick={() => handleTogglePublishContent(content)}
                      className={`text-xs px-3 py-1 rounded-2xl cursor-pointer font-medium transition ${
                        content.isPublished
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {content.isPublished ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white text-xxs px-2 py-1 cursor-pointer rounded-lg"
                  onClick={() => handleDeleteContent(content.id)}
                >
                  delete
                </button>
              </div>
            ))}

            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => handleTogglePublish(section)}
                className={`text-xs px-3 py-1 rounded-2xl cursor-pointer font-medium transition ${
                  section.isPublished
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {section.isPublished ? "Unpublish" : "Publish"}
              </button>

              <button
                onClick={() => handleOpenContentModal(section.id)}
                className="text-sm text-blue-600 hover:underline"
              >
                ➕ Add Content
              </button>
            </div>
          </div>
          // <Section
          //   key={section.id}
          //   section={section}
          //   handledeletesection={handleDeleteSection}
          //   handleTogglePublish={handleTogglePublish}
          //   handleOpenContentModal={handleOpenContentModal}
          // />
        ))
      )}

      {/* ➕ Add Section */}
      <div className="text-center mt-6">
        <button
          onClick={handleAddSectionClick}
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 flex items-center gap-2"
        >
          <Plus size={18} className="text-white" /> Add Section
        </button>
      </div>

      {/* ➕ Section Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
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

      {/* ➕ Content Modal */}
      {showContentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Content</h2>
            <form className="space-y-4" onSubmit={handleContentSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={contentFormData.title}
                onChange={handleContentInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={contentFormData.description}
                onChange={handleContentInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={contentFormData.contentType === "LIVE"}
                    onChange={() =>
                      setContentFormData((prev) => ({
                        ...prev,
                        contentType: prev.contentType === "LIVE" ? "" : "LIVE",
                      }))
                    }
                  />
                  LIVE
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={contentFormData.contentType === "RECORDED"}
                    onChange={() =>
                      setContentFormData((prev) => ({
                        ...prev,
                        contentType:
                          prev.contentType === "RECORDED" ? "" : "RECORDED",
                      }))
                    }
                  />
                  RECORDED
                </label>
              </div>
              <input
                type="url"
                name="videoUrl"
                placeholder="Video URL"
                value={contentFormData.videoUrl}
                onChange={handleContentInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="url"
                name="thumbnailUrl"
                placeholder="Thumbnail URL"
                value={contentFormData.thumbnailUrl}
                onChange={handleContentInputChange}
                className="w-full p-2 border rounded"
              />
              <label htmlFor="">Duration</label>
              <input
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                value={contentFormData.duration}
                onChange={handleContentInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="datetime-local"
                name="startTime"
                value={contentFormData.startTime}
                onChange={handleContentInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="datetime-local"
                name="endTime"
                value={contentFormData.endTime}
                onChange={handleContentInputChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={contentFormData.isPublished}
                    onChange={handleContentInputChange}
                  />
                  Published
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isGlobal"
                    checked={contentFormData.isGlobal}
                    onChange={handleContentInputChange}
                  />
                  Global
                </label>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseContentModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Content
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
