import React from "react";
import ImageCarouselSwiper from "./ImageCarouselSwiper";

function HomeHero() {
  return (
    <div className="flex items-center justify-between mt-0.5 px-12 py-16 bg-gradient-to-r from-[#fdf5ff] to-[#f4f4ff] relative overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 lg:pr-25">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Your LMS. Powered by AI.
        </h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Branded for You.
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Launch your own white-labeled LMS with AI mock interviews, auto
          evaluations, and coding labs-all with zero tech effort.
        </p>
        <div className="flex gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow">
            Book a free Demo
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-full shadow">
            Get Early Access
          </button>
        </div>
      </div>

      {/* Right Section (Carousel) */}
      <div className="w-1/2 relative pl-15">
        <ImageCarouselSwiper />

        
      </div>
    </div>
  );
}

export default HomeHero;
