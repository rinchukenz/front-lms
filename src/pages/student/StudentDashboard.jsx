import React from "react";
import CalendarCarousel from "../../components/Calender/CalendarCarousel";
import ProgressTracking from "../../components/ProgressTracking/ProgressTracking";
import profileImage from "../../assets/propicture.jpeg";

function StudentDashboard() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Welcome Message */}
      <div className="w-full flex items-center justify-center sm:mt-5">
        <div className="basis-1/3 flex justify-center">
          <img
            className="object-cover rounded-full w-18 h-18 sm:w-25 sm:h-25 md:w-30 md:h-30 lg:w-30 lg:h-30"
            src={profileImage}
            alt="Profile"
          />
        </div>
        <div className="basis-2/3">
          <h3 className="font-semibold font-sans text-2xl sm:text-5xl">
            Welcome back,
          </h3>
          <h3 className="font-sans font-semibold text-3xl sm:text-6xl py-1 sm:py-2 text-center bg-gradient-to-r from-violet-500 to-pink-400 text-transparent bg-clip-text">
            Adithya
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Calender */}
        <div className="flex flex-col md:mt-3">
          <h2 className="font-semibold text-2xl sm:text-3xl ml-[5%] mt-10 md:ml-15">
            Calender Schedule
          </h2>
          <CalendarCarousel />
        </div>

        {/* Progress Tracking */}
        <div className="flex flex-col md:mt-3">
          <h2 className="font-semibold text-2xl sm:text-3xl ml-[5%] mt-10">
            Progress Tracking
          </h2>
          <ProgressTracking />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
