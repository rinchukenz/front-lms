import React, { useState } from "react";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";
import icon4 from "../../assets/icon4.svg";
import icon5 from "../../assets/icon5.svg";
import icon6 from "../../assets/icon6.svg";
import Icon from "../../pages/opening-window/Icon";

function HomeHero() {
  const iconData = [
    {
      src: icon1,
      className: "w-18 h-18",
      delay: 0,
    },
    {
      src: icon2,
      className: "w-18 h-18",
      delay: 0.2,
    },
    {
      src: icon3,
      className: "w-14 h-14",
      delay: 0.4,
    },
    {
      src: icon4,
      className: "w-18 h-18",
      delay: 0.6,
    },
    {
      src: icon5,
      className: "w-18 h-18",
      delay: 0.8,
    },
    {
      src: icon6,
      className: "w-14 h-14",
      delay: 1.0,
    },
  ];

  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-col mt-[80px] lg:flex-row-reverse items-center justify-between px-4 md:px-12 py-12 md:py-16 lg:py-15 bg-white overflow-hidden">
      {/* Animation */}
      <div
        className={`w-full relative lg:w-[45%] transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="ANIMATION-CONTAINER relative w-full h-full">
          {iconData.map((icon, index) => (
            <Icon
              key={index}
              src={icon.src}
              className={`absolute ${icon.className}`}
              delay={icon.delay}
            />
          ))}
        </div>
      </div>

      {/* Texts */}
      <div className="w-full mt-[40vh] lg:mt-2 lg:w-[55%] px-2 lg:px-8 space-y-8">
        <h1 className="text-2xl lg:text-4xl font-ibm font-bold">Empowering Organizations and Students to Learn, Grow, and Lead</h1>
        <p className="text-sm">
          Discover a world of knowledge with our interactive learning platform.
          Join thousands of students on their journey to success.
        </p>
        {/* Enhanced Stats */}
        <div className="flex flex-wrap justify-center px-3 lg:justify-start gap-6 sm:gap-8">
          <div className="w-[25%] text-center bg-white/40 backdrop-blur-sm rounded-2xl px-2 py-2 sm:px-6 sm:py-4 shadow-lg border border-white/20">
            <div className="text-xs sm:text-xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 to-violet-300 bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-xxs sm:text-xs text-gray-600 font-medium">
              Active Students
            </div>
          </div>
          <div className="w-[25%] text-center bg-white/40 backdrop-blur-sm rounded-2xl px-2 py-2 sm:px-6 sm:py-4 shadow-lg border border-white/20">
            <div className="text-xs sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
              500+
            </div>
            <div className="text-xxs sm:text-xs text-gray-600 font-medium">
              Courses
            </div>
          </div>
          <div className="w-[25%] text-center bg-white/40 backdrop-blur-sm rounded-2xl px-2 py-2 sm:px-6 sm:py-4 shadow-lg border border-white/20">
            <div className="text-xs sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              95%
            </div>
            <div className="text-xxs sm:text-xs text-gray-600 font-medium">
              Success Rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHero;
