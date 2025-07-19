import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // <- add this
import axios from "axios"; // install axios if not yet

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const { role, user } = res.data;

      setAuth({
        isLoggedIn: true,
        role,
        user,
      });

      // Redirect based on role
      switch (role) {
        case "student":
          navigate("/student");
          break;
        case "instructor":
          navigate("/instructor");
          break;
        case "orgadmin":
          navigate("/orgadmin");
          break;
        case "superadmin":
          navigate("/superadmin");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <CustomInput
        label="Email"
        type="email"
        placeholder="Enter your email here"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CustomInput
        label="Password"
        type="password"
        placeholder="***********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton
        text="Sign in"
        className="cursor-pointer w-full bg-violet-500 text-white py-2 rounded-lg"
      />
    </form>
  );
}





@PostMapping("/api/auth/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    User user = userService.findByEmailAndPassword(request.getEmail(), request.getPassword());

    if (user != null) {
        return ResponseEntity.ok(Map.of(
            "role", user.getRole(), // "student", "instructor", etc.
            "user", user
        ));
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}




superadmin@skyllx.com




<div className="flex gap-4 mb-6 text-white">
        <button className="border px-2 py-1 bg-violet-500 rounded-md">
          New Recorded course
        </button>
        <button className="border px-2 py-1 bg-violet-500 rounded-md">
          New Cohort-Based Course (CBC)
        </button>
      </div>











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








 <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <form
              onSubmit={handleInstructorSubmit}
              className="space-y-4"
            >
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
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
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
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>



{/* <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden">
        <button
          onClick={() => setLoginType("ADMIN")}
          className={`px-4 py-2 text-sm font-medium ${
            loginType === "ADMIN"
              ? "bg-violet-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          ADMIN
        </button>
        <button
          onClick={() => setLoginType("USER")}
          className={`px-4 py-2 text-sm font-medium ${
            loginType === "USER"
              ? "bg-violet-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          USER
        </button>
      </div>
      {loginType === "USER" ? <StudentLogin /> : <Login />} */}
























































import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  addSection,
  deleteSection,
  getSections,
  publishSection,
  unpublishSection,
  addContent,
  getContentsBySectionId,
} from "../services/OrgAdminService";
import { toast } from "react-toastify";

function CourseSyllabus() {
  const { cId } = useParams();
  const { auth } = useAuth();

  const [sections, setSections] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [sectionContents, setSectionContents] = useState({});
  const [contentType, setContentType] = useState(""); // LIVE or VIDEO

  const [newSection, setNewSection] = useState({
    courseId: cId,
    title: "",
    description: "",
    isPaid: false,
    isPublished: false,
    prerequisiteSectionIds: [],
    organizationId: auth.organizationId,
  });

  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    contentType: "",
    startTime: "",
    endTime: "",
    duration: "",
    videoUrl: "",
    sectionId: "",
    courseId: cId,
    organizationId: auth.organizationId,
    isPublished: false,
  });

  const [videoFile, setVideoFile] = useState(null);

  const fetchSections = async () => {
    try {
      const response = await getSections(cId);
      setSections(response.data);

      // fetch contents for all sections
      const allContents = {};
      for (const sec of response.data) {
        const contentRes = await getContentsBySectionId(sec.id);
        allContents[sec.id] = contentRes.data;
      }
      setSectionContents(allContents);
    } catch (error) {
      toast.error("Failed to fetch sections.");
    }
  };

  const handleTogglePublish = async (section) => {
    try {
      section.isPublished
        ? await unpublishSection(section.id)
        : await publishSection(section.id);
      toast.success(
        section.isPublished ? "Section Unpublished" : "Section Published"
      );
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSection((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    if (!newSection.title || !newSection.description) {
      toast.warn("Please fill all required fields");
      return;
    }
    try {
      await addSection(newSection);
      toast.success("Section added");
      fetchSections();
      handleModalClose();
    } catch {
      toast.error("Add section failed");
    }
  };

  const handleDeleteSection = async (section) => {
    try {
      await deleteSection(section.id);
      toast.success("Section deleted");
      fetchSections();
    } catch {
      toast.error("Failed to delete section");
    }
  };

  const handleAddContentClick = (section) => {
    setCurrentSectionId(section.id);
    setContentType("");
    setNewContent({
      title: "",
      description: "",
      contentType: "",
      startTime: "",
      endTime: "",
      duration: "",
      videoUrl: "",
      sectionId: section.id,
      courseId: cId,
      organizationId: auth.organizationId,
      isPublished: false,
    });
    setShowContentModal(true);
  };

  const handleContentTypeToggle = (type) => {
    setContentType(type);
    setNewContent((prev) => ({
      ...prev,
      contentType: type,
    }));
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setNewContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const seq = sectionContents[currentSectionId]?.length || 0;
    formData.append("title", newContent.title);
    formData.append("description", newContent.description);
    formData.append("contentType", newContent.contentType);
    formData.append("courseId", cId);
    formData.append("sectionId", currentSectionId);
    formData.append("organizationId", auth.organizationId);
    formData.append("isPublished", newContent.isPublished || false);
    formData.append("sequenceNumber", seq + 1);

    if (contentType === "VIDEO") {
      formData.append("videoUrl", newContent.videoUrl || "");
      if (videoFile) formData.append("file", videoFile);
    } else if (contentType === "LIVE") {
      formData.append("startTime", newContent.startTime);
      formData.append("endTime", newContent.endTime);
      formData.append("duration", newContent.duration);
      formData.append("videoUrl", newContent.videoUrl); // assuming live URL
    }

    try {
      await addContent(formData);
      toast.success("Content added");
      setShowContentModal(false);
      fetchSections();
    } catch (error) {
      toast.error("Failed to add content");
    }
  };

  useEffect(() => {
    if (cId) fetchSections();
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
            className="mb-6 border rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <button
                onClick={() => handleDeleteSection(section)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-gray-700">{section.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              Paid: {section.isPaid ? "Yes" : "No"} | Published:{" "}
              {section.isPublished ? "Yes" : "No"}
            </p>
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleTogglePublish(section)}
                className={`text-xs px-3 py-1 rounded font-medium ${
                  section.isPublished
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {section.isPublished ? "Unpublish" : "Publish"}
              </button>
              <button
                onClick={() => handleAddContentClick(section)}
                className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded hover:bg-blue-200"
              >
                ➕ Add Content
              </button>
            </div>

            {/* Show Contents */}
            {sectionContents[section.id]?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-bold mb-1 text-gray-700">Contents:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {sectionContents[section.id].map((c) => (
                    <li key={c.id}>
                      {c.sequenceNumber}. {c.title} ({c.contentType})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleAddSectionClick}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Section
        </button>
      </div>

      {/* Section Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Add New Section</h2>
            <form onSubmit={handleSectionSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title *"
                value={newSection.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                placeholder="Description *"
                value={newSection.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
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
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content Modal */}
      {showContentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">Add Content</h2>
            <form onSubmit={handleContentSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Content Title *"
                value={newContent.title}
                onChange={handleContentChange}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Content Description *"
                value={newContent.description}
                onChange={handleContentChange}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex gap-4">
                <label>
                  <input
                    type="checkbox"
                    checked={contentType === "LIVE"}
                    onChange={() => handleContentTypeToggle("LIVE")}
                  />{" "}
                  LIVE
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={contentType === "VIDEO"}
                    onChange={() => handleContentTypeToggle("VIDEO")}
                  />{" "}
                  VIDEO
                </label>
              </div>

              {contentType === "LIVE" && (
                <>
                  <input
                    type="text"
                    name="videoUrl"
                    placeholder="Live Stream URL"
                    value={newContent.videoUrl}
                    onChange={handleContentChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={newContent.startTime}
                    onChange={handleContentChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={newContent.endTime}
                    onChange={handleContentChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="duration"
                    placeholder="Duration (minutes)"
                    value={newContent.duration}
                    onChange={handleContentChange}
                    className="w-full p-2 border rounded"
                  />
                </>
              )}

              {contentType === "VIDEO" && (
                <>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="w-full"
                  />
                  <input
                    type="text"
                    name="videoUrl"
                    placeholder="Video URL (optional)"
                    value={newContent.videoUrl}
                    onChange={handleContentChange}
                    className="w-full p-2 border rounded"
                  />
                </>
              )}

              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowContentModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
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
}

export default CourseSyllabus;
