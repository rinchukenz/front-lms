// components/ClassSchedule.jsx

import React from "react";

// const classes = [
//   {
//     title: "SpringBoot Class",
//     type: "Live",
//     time: "12:00 PM",
//     color: "bg-gradient-to-r from-violet-500 to-pink-400"
//   },
//   {
//     title: "React Class",
//     type: "Live",
//     time: "12:00 PM",
//     color: "bg-gradient-to-r from-violet-500 to-pink-400"
//   }
// ];

// Single class card
const ClassCard = ({ title, type, time }) => (
  <div className="flex items-center justify-between rounded-xl overflow-hidden border mb-4 shadow-sm">
    <div
      className={`w-3/5 p-4 text-white ${
        type == "Live class"
          ? "bg-[#CD68FF]"
          : "bg-[#8E7AFF]"
      }  rounded-l-xl`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-xs mt-1">{type}</p>
    </div>
    <div className="w-2/5 flex flex-col justify-between items-center p-3 gap-2">
      <button className="border border-purple-500 cursor-pointer text-purple-600 px-4 py-1 text-sm rounded-full hover:bg-purple-100 transition">
        Click here
      </button>
      <p className="text-xs text-gray-500 text-right">{time}</p>
    </div>
  </div>
);

// Parent component that receives props
const ClassSchedule = ({ selectedDate, classData }) => {
  const formattedDate = selectedDate.format("YYYY-MM-DD");
  const classes = classData[formattedDate] || [];

  console.log("Formatted Date:", formattedDate);
  console.log("Classes:", classes);

  return (
    <div className="mt-6 px-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        Classes on {formattedDate}:
      </h2>
      {classes.length > 0 ? (
        classes.map((classItem, idx) => <ClassCard key={idx} {...classItem} />)
      ) : (
        <p className="text-gray-400 text-sm">No classes scheduled.</p>
      )}
    </div>
  );
};

export default ClassSchedule;
