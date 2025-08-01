import React from "react";

function Section({ section, handledeletesection, handleTogglePublish, handleOpenContentModal }) {
  return (
    <div
      key={section.id}
      className="mb-4 border border-dashed rounded-lg p-4 bg-white shadow-sm"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold mb-1">{section.title}</h2>
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-lg"
          onClick={() => handledeletesection(section)}
        >
          Delete
        </button>
      </div>
      <p className="text-sm text-gray-700 mb-2">{section.description}</p>
      <p className="text-xs text-gray-500">
        Paid: {section.isPaid ? "Yes" : "No"} | Published:{" "}
        {section.isPublished ? "Yes" : "No"}
      </p>


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
  );
}

export default Section;
