import React, { useState, useRef } from "react";

function AddContent({ onSubmit }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contentType: "LIVE",
    videoUrl: "",
    thumbnailUrl: "",
    duration: "",
    sequenceNumber: "",
    startTime: "",
    endTime: "",
    organizationId: "",
    courseId: "",
    sectionId: "",
    isPublished: true,
    isGlobal: false,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const finalValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleClearFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use FormData for file upload if sending to backend
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) payload.append(key, value);
    });

    if (onSubmit) onSubmit(payload);

    // Optional: For debugging
    console.log("Submitted Content:", formData);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "title", label: "Title" },
          { name: "description", label: "Description" },
          { name: "contentType", label: "Content Type (LIVE / VIDEO)" },
          { name: "videoUrl", label: "Video URL" },
          { name: "thumbnailUrl", label: "Thumbnail URL" },
          { name: "duration", label: "Duration (in minutes)", type: "number" },
          { name: "sequenceNumber", label: "Sequence Number", type: "number" },
          { name: "startTime", label: "Start Time", type: "datetime-local" },
          { name: "endTime", label: "End Time", type: "datetime-local" },
          { name: "organizationId", label: "Organization ID" },
          { name: "courseId", label: "Course ID" },
          { name: "sectionId", label: "Section ID" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        ))}

        {/* File Upload Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload File</label>
          <input className="border border-gray-300 cursor-pointer hover:bg-gray-100 rounded px-3 py-2"
            ref={fileInputRef}
            type="file"
            name="file"
            accept="*/*"
            onChange={handleChange}
          />
          {formData.file && (
            <div className="mt-1 flex justify-between items-center text-xs text-gray-600">
              <span>Selected: {formData.file.name}</span>
              <button
                type="button"
                onClick={handleClearFile}
                className="text-red-500 hover:underline ml-4"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          <label>Is Published?</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isGlobal"
            checked={formData.isGlobal}
            onChange={handleChange}
          />
          <label>Is Global?</label>
        </div>

        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          Add Content
        </button>
      </form>
    </div>
  );
}

export default AddContent;
