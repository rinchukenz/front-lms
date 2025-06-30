import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentData() {

    const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("enrollments");

  const TabButton = ({ label, value }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded-full text-sm transition ${
        activeTab === value
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="text-sm bg-gray-50 text-gray-800 px-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-bold cursor-pointer m-6 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
      >
        Go Back
      </button>

      {/* Profile */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl mb-3">
          👤
        </div>
        <h2 className="text-xl font-semibold">Darshan G N</h2>
        <p className="text-blue-600 underline">darshan.g.n181903@gmail.com</p>
        <div className="flex gap-3 mt-3 text-xs text-gray-600">
          <div className="bg-gray-100 px-3 py-1 rounded-full">
            📅 Joined: 23rd June, 2025 at 03:16 PM
          </div>
          <div className="bg-gray-100 px-3 py-1 rounded-full">
            🕒 Last online: Never
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-6 justify-center">
        <TabButton label="Enrollments" value="enrollments" />
        <TabButton label="Activity" value="activity" />
        <TabButton label="Exports" value="exports" />
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "enrollments" && (
          <div>
            <h3 className="font-semibold text-base mb-3">
              Courses <span className="text-gray-500 text-sm">(2 total)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Java Fullstack", "Java Practice Lab"].map((course, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <h4 className="font-medium text-sm mb-1">{course}</h4>
                  <p className="text-xs text-gray-500 mb-2">
                    Enrolled on 23rd June, 2025 at 03:16 PM
                  </p>
                  <div className="w-full bg-gray-100 h-2 rounded-full">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-right text-gray-500">0%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="bg-white p-4 border rounded-md shadow-sm text-sm">
            <h3 className="font-semibold text-base mb-3">Recent Activity</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Viewed "Java Fullstack - Module 1" (June 25th, 2025)</li>
              <li>
                Opened "Java Practice Lab - Assignment 1" (June 25th, 2025)
              </li>
              <li>Browsed course catalog (June 24th, 2025)</li>
            </ul>
          </div>
        )}

        {activeTab === "exports" && (
          <div className="bg-white p-4 border rounded-md shadow-sm text-sm">
            <h3 className="font-semibold text-base mb-3">Exported Data</h3>
            <p className="text-gray-600">No exports available yet.</p>
            <button className="mt-3 px-4 py-2 bg-gray-800 text-white text-xs rounded hover:bg-black">
              Export Profile Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentData;
