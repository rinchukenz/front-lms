import React from "react";
import resume from "../../assets/resume.png";

function ResumeBuilder() {
  return (
    <div className="flex justify-between items-center bg-[#CD68FF] rounded-2xl p-6 mt-5">
      {/* Left section */}
      <div className="max-w-[60%]">
        <h2 className="text-white text-lg font-semibold mb-2">New</h2>
        <p className="text-white text-11px leading-3.5 mb-4">
          Create a professional resume in minutes using our guided resume builder. 
          Customize your information, download in PDF format, and be ready for your next opportunity.
        </p>
        <button className="bg-white text-black text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-gray-100 transition">
          Create a resume
        </button>
      </div>

      {/* Right section */}
      <div className="w-2/5 flex justify-end">
        <img src={resume} alt="Resume Illustration" className="max-h-40 object-contain" />
      </div>
    </div>
  );
}

export default ResumeBuilder;
