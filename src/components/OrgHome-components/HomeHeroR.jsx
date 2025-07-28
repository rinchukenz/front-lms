import React from "react";
import ImageCarouselSwiper from "./ImageCarouselSwiper";

function HomeHeroR() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-12 py-12 md:py-16 lg:py-25 bg-[#ffffff] relative overflow-hidden">
      
      {/* Left Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left mt-20 lg:pt-10 lg:mt-15">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-ibm font-bold text-gray-900 mb-2">
          Your LMS. Powered by AI.
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-ibm font-bold text-gray-900 mb-6">
          Branded for You.
        </h2>
        <p className="text-gray-600 font-inter text-sm sm:text-base md:text-lg mb-8 px-2 sm:px-6 md:px-10 lg:px-0 lg:pr-10">
          Launch your own white-labeled LMS with AI mock interviews, auto
          evaluations, and coding labs, all with zero tech effort.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start px-2 lg:px-0">
          <button className="bg-[#9D5CFF] hover:bg-purple-700 font-inter text-white px-6 py-3 rounded-full shadow">
            Book a free Demo
          </button>
          <button className="bg-white border font-inter border-gray-300 hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-full shadow">
            Get Early Access
          </button>
        </div>
      </div>

      {/* Right Section (Carousel) */}
      <div className="w-full mt-20 lg:mt-20 lg:w-1/2">
        <ImageCarouselSwiper />
      </div>
    </div>
  );
}

export default HomeHeroR;
