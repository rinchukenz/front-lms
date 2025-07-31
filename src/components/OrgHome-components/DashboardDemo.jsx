import React from "react";
import centerImage from "../../assets/demoDashboard.png";

function DashboardDemo() {
  return (
    <div className="w-full min-h-[10vh] flex items-center justify-center relative">
      {/* Background: Top pink-50, bottom white */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#FDF7FD] z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-0" />

      {/* Centered Image */}
      <div className="z-10 w-[80%] max-w-[900px] px-4 lg:py-10">
        <img
          src={centerImage}
          alt="Centered"
          className="w-full h-auto object-contain rounded-xl shadow-md border border-[#ABABAB]"
        />
      </div>
    </div>
  );
}

export default DashboardDemo;
