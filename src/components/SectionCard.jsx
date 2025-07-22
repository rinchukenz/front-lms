import React from "react";

const SectionCard = ({
  section,
  contents,
  onDeleteSection,
  onTogglePublish,
  onAddContent,
  onDeleteContent,
  onTogglePublishContent,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-300 p-6 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{section.title}</h2>
        <div className="space-x-2">
          <button
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => onDeleteSection(section.id)}
          >
            Delete
          </button>
          <button
            className={`text-sm px-3 py-1 rounded ${
              section.isPublished
                ? "bg-yellow-500 text-white"
                : "bg-green-500 text-white"
            }`}
            onClick={() => onTogglePublish(section)}
          >
            {section.isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => onAddContent(section.id)}
          >
            Add Content
          </button>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{section.description}</p>

      {/* Contents List */}
      <div className="mt-4 space-y-4">
        {contents.map((content) => (
          <div
            key={content.id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded border"
          >
            <div>
              <h3 className="font-semibold">{content.title}</h3>
              <p className="text-sm text-gray-500">{content.contentType}</p>
              <p className="text-sm text-gray-500">
                Published: {content.isPublished ? "Yes" : "No"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="text-xs bg-red-400 text-white px-2 py-1 rounded"
                onClick={() => onDeleteContent(content.id)}
              >
                Delete
              </button>
              <button
                className={`text-xs px-2 py-1 rounded ${
                  content.isPublished
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                }`}
                onClick={() => onTogglePublishContent(content)}
              >
                {content.isPublished ? "Unpublish" : "Publish"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionCard;
