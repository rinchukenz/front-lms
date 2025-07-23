import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentData() {

    const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("enrollments");

  const TabButton = ({ label, value }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded-full cursor-pointer border border-[#9F9F9F] text-xs transition ${
        activeTab === value
          ? "bg-[#9D5CFF] text-white"
          : "bg-white text-black hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="text-sm text-gray-800 p-8">
      <p className="text-[#797979] text-sm">Analyze profile data, course enrollments, and learning activity of your user</p>
      <button
        onClick={() => navigate(-1)}
        className="text-xs font-bold cursor-pointer my-6 bg-[#9D5CFF] text-white px-3 py-1 rounded hover:bg-violet-500 transition"
      >
        Go Back
      </button>

      {/* Profile */}
      <div className="bg-white border border-[#E5E4E4] shadow-md rounded-xl p-3 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 mt-10 flex items-center justify-center text-gray-500 text-3xl mb-3">
          👤
        </div>
        <h2 className="text-xl font-bold">Darshan G N</h2>
        <p className="text-[#9D5CFF]">darshan.g.n181903@gmail.com</p>
        <div className="flex gap-3 mt-10 text-xs">
          <div className="border border-[#B2B2B2] text-xxs font-semibold px-3 py-1 rounded-full">
            📅 Joined: 23rd June, 2025 at 03:16 PM
          </div>
          <div className="border border-[#B2B2B2] text-xxs font-semibold px-3 py-1 rounded-full">
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
            <h3 className="font-medium text-base mb-3">
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
                      className="bg-[#9D5CFF] h-2 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-right text-gray-500">50%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm text-sm">
            <h3 className="font-semibold text-base mb-3">Activity Overview</h3>
            <div className="flex px-6 gap-10 justify-between">
              <div className="border rounded-lg text-center w-full border-[#B2B2B2] py-4 px-4">
                <p>Time spent</p>
                <span className="font-bold">30 mins</span>
              </div>
              <div className="border rounded-lg text-center w-full border-[#B2B2B2] py-4 px-4">
                <p>XP earned</p>
                <span className="font-bold">20</span>
              </div>
              <div className="border rounded-lg text-center w-full border-[#B2B2B2] py-4 px-4">
                <p>Daily average time</p>
                <span className="font-bold">10 mins</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "exports" && (
          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm text-sm">
            <h3 className="font-semibold text-base mb-3">Contest Export</h3>
            <p className="text-gray-600">Exports all the attempt reports by the user in all contests on your platform</p>
            <button className="mt-3 px-4 py-2 font-semibold text-black text-xs border border-[#B2B2B2] rounded">
              Download all contest data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentData;
