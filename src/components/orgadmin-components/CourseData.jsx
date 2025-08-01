import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function CourseData() {
  const { cId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === parseInt(cId));

  const [sections, setSections] = useState(course.sections || []);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionDesc, setNewSectionDesc] = useState("");
  const [newContents, setNewContents] = useState({}); // key = section index, value = string

  const addSection = () => {
    if (!newSectionTitle.trim()) return;
    setSections([
      ...sections,
      { title: newSectionTitle, description: newSectionDesc, contents: [] },
    ]);
    setNewSectionTitle("");
    setNewSectionDesc("");
  };

  const addContent = (sectionIndex) => {
    const content = newContents[sectionIndex];
    if (!content || !content.trim()) return;

    const updated = [...sections];
    updated[sectionIndex].contents.push(content);
    setSections(updated);

    setNewContents((prev) => ({ ...prev, [sectionIndex]: "" }));
  };

  return (
    <div className="p-10">
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-bold cursor-pointer bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
      >
        Go Back
      </button>

      <div className="mt-6">
        <img
          src={course.image}
          alt={course.title}
          className="w-full max-w-[400px] rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <h3 className="text-lg text-gray-600 mb-4">{course.subtitle}</h3>
        <p className="text-md text-gray-700 mb-6">{course.description}</p>

        {/* Add New Section */}
        <div className="mb-8 bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Add New Section</h4>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="Section Title"
              className="px-3 py-1 border border-gray-300 rounded"
            />
            <input
              type="text"
              value={newSectionDesc}
              onChange={(e) => setNewSectionDesc(e.target.value)}
              placeholder="Section Description"
              className="px-3 py-1 border border-gray-300 rounded"
            />
            <button
              onClick={addSection}
              className="px-3 py-1 w-30 bg-violet-500 text-white rounded hover:bg-violet-600"
            >
              Add Section
            </button>
          </div>
        </div>

        {/* Sections and dynamic content form */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-gray-50 border p-4 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">{section.title}</h4>
              <h3 className="text-sm mb-2">{section.description}</h3>

              <ul className="list-disc list-inside text-gray-700 mb-3">
                {section.contents.map((content, idx) => (
                  <li key={idx}>{content}</li>
                ))}
              </ul>

              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={newContents[index] || ""}
                  onChange={(e) =>
                    setNewContents({ ...newContents, [index]: e.target.value })
                  }
                  placeholder="Add content..."
                  className="px-3 py-1 border border-gray-300 rounded w-full"
                />
                <Link to={`/orgadmin/courses/${cId}/add-content`}>
                  <button
                    onClick={() => addContent(index)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add Content
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseData;
