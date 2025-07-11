import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCourse, getCourseById, EditCourse } from "../services/OrgAdminService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function AddCourse() {
  const { cId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { organizationId, adminId } = auth;

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "",
    category: "",
    tags: "",
    thumbnailUrl: "",
    certificateSampleUrl: "",
    isFree: false,
    visibility: "PUBLIC",
    organizationId: organizationId,
    createdByAdminId: adminId,
  });

  // Fetch existing course for editing
  useEffect(() => {
    if (cId) {
      getCourseById(cId)
        .then((res) => {
          const course = res.data;
          setFormData({
            ...course,
            tags: course.tags ? course.tags.join(", ") : "",
          });
        })
        .catch((err) => {
          console.error("Failed to load course", err);
          toast.error("Failed to load course");
        });
    }
  }, [cId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (cId) {
        await EditCourse(cId, payload);
        toast.success("Course updated successfully");
      } else {
        await createCourse(payload);
        toast.success("Course created successfully");
      }

      navigate("/orgadmin/courses");
    } catch (err) {
      toast.error("Operation failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {cId ? "Update Course" : "Add New Course"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            name="title"
            placeholder="e.g. Java Masterclass"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <input
            name="subtitle"
            placeholder="e.g. From Zero to Expert"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            placeholder="Comprehensive course on Java..."
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <input
            name="language"
            placeholder="e.g. English"
            value={formData.language}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            name="category"
            placeholder="e.g. Programming"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <input
            name="tags"
            placeholder="e.g. Java, Spring Boot, Backend"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail URL
          </label>
          <input
            name="thumbnailUrl"
            placeholder="https://example.com/image.jpg"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Certificate Sample URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certificate Sample URL
          </label>
          <input
            name="certificateSampleUrl"
            placeholder="https://example.com/sample-certificate.pdf"
            value={formData.certificateSampleUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Is Free */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isFree"
            checked={formData.isFree}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isFree" className="text-sm font-medium text-gray-700">
            Is this course free?
          </label>
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visibility
          </label>
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium text-lg transition-all duration-300"
        >
          {cId ? "Update Course" : "Create Course"}
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
