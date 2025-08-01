import React, { useEffect, useState } from "react";
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
} from "../../services/OrgAdminService";
import { useParams } from "react-router-dom";
import SectionCard from "./SectionCard";
import { useAuth } from "../../context/AuthContext";

const CourseSyllabus = () => {
  const { cId } = useParams();

  const { auth } = useAuth();

  console.log(auth.organizationId);

  const [sections, setSections] = useState([]);
  const [contents, setContents] = useState([]);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [sectionFormData, setSectionFormData] = useState({
    courseId: cId,
    title: "",
    description: "",
    isPaid: false,
    isPublished: false,
    prerequisiteSectionIds: [], // empty array
    organizationId: auth.organizationId, // set your actual org ID
  });

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentFormData, setContentFormData] = useState({
    title: "",
    description: "",
    contentType: "LIVE",
    videoUrl: "",
    thumbnailUrl: "",
    duration: "",
    startTime: "",
    endTime: "",
    organizationId: 1,
    courseId: cId,
    sectionId: null,
    isPublished: false,
    isGlobal: false,
  });

  useEffect(() => {
    fetchSections();
    fetchContents();
  }, [cId]);

  const fetchSections = async () => {
    try {
      const response = await getSections(cId);
      setSections(response.data);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const fetchContents = async () => {
    try {
      const response = await getContents(cId);
      setContents(response.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  const handleOpenSectionModal = () => setIsSectionModalOpen(true);

  const handleCloseSectionModal = () => {
    setIsSectionModalOpen(false);
    setSectionFormData({
      courseId: cId,
      title: "",
      description: "",
      isPaid: false,
      isPublished: false,
      prerequisiteSectionIds: [],
      organizationId: auth.organizationId,
    });
  };

  const handleSectionInputChange = (e) => {
    const { name, value } = e.target;
    setSectionFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Section form data", sectionFormData);
      await addSection(sectionFormData);
      fetchSections();
      handleCloseSectionModal();
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    await deleteSection(sectionId);
    fetchSections();
  };

  const togglePublish = async (sectionId, shouldPublish) => {
    try {
      if (shouldPublish) {
        await publishSection(sectionId);
      } else {
        await unpublishSection(sectionId);
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  const handleTogglePublish = async (section) => {
    await togglePublish(section.id, !section.isPublished);
    fetchSections(); // re-fetch sections to update UI
  };

  const handleOpenContentModal = (sectionId) => {
    setContentFormData((prev) => ({ ...prev, sectionId }));
    setIsContentModalOpen(true);
  };

  const handleCloseContentModal = () => {
    setIsContentModalOpen(false);
    setContentFormData({
      title: "",
      description: "",
      contentType: "LIVE",
      videoUrl: "",
      thumbnailUrl: "",
      duration: "",
      startTime: "",
      endTime: "",
      organizationId: 1,
      courseId: cId,
      sectionId: null,
      isPublished: false,
      isGlobal: false,
    });
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
    try {
      await addContent(contentFormData);
      fetchContents();
      handleCloseContentModal();
    } catch (error) {
      console.error("Error creating content:", error);
    }
  };

  const handleDeleteContent = async (contentId) => {
    await deleteContent(contentId);
    fetchContents();
  };

  const togglePublishContent = async (contentId, shouldPublish) => {
    try {
      if (shouldPublish) {
        await publishContent(contentId);
      } else {
        await unpublishContent(contentId);
      }
    } catch (error) {
      console.error("Error toggling content publish status:", error);
    }
  };

  const handleTogglePublishContent = async (content) => {
    await togglePublishContent(content.id, !content.isPublished);
    fetchContents();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Syllabus</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={handleOpenSectionModal}
        >
          Add Section
        </button>
      </div>

      {/* Render all sections with their respective contents */}
      <div className="mt-6 space-y-6">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            contents={contents.filter((c) => c.sectionId === section.id)}
            onDeleteSection={handleDeleteSection}
            onTogglePublish={handleTogglePublish}
            onAddContent={handleOpenContentModal}
            onDeleteContent={handleDeleteContent}
            onTogglePublishContent={handleTogglePublishContent}
          />
        ))}
      </div>

      {/* Section Modal */}
      {isSectionModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Section</h2>
            <form onSubmit={handleSectionSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={sectionFormData.title}
                onChange={handleSectionInputChange}
                placeholder="Section Title"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="description"
                value={sectionFormData.description}
                onChange={handleSectionInputChange}
                placeholder="Section Description"
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={handleCloseSectionModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content Modal */}
      {isContentModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Content</h2>
            <form onSubmit={handleContentSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                value={contentFormData.title}
                onChange={handleContentInputChange}
                placeholder="Title"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="description"
                value={contentFormData.description}
                onChange={handleContentInputChange}
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
              <div>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="contentType"
                    value="LIVE"
                    checked={contentFormData.contentType === "LIVE"}
                    onChange={handleContentInputChange}
                  />
                  LIVE
                </label>
                <label>
                  <input
                    type="radio"
                    name="contentType"
                    value="RECORDED"
                    checked={contentFormData.contentType === "RECORDED"}
                    onChange={handleContentInputChange}
                  />
                  RECORDED
                </label>
              </div>
              <input
                type="text"
                name="videoUrl"
                value={contentFormData.videoUrl}
                onChange={handleContentInputChange}
                placeholder="Video URL"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="thumbnailUrl"
                value={contentFormData.thumbnailUrl}
                onChange={handleContentInputChange}
                placeholder="Thumbnail URL"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="duration"
                value={contentFormData.duration}
                onChange={handleContentInputChange}
                placeholder="Duration"
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={handleCloseContentModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSyllabus;
