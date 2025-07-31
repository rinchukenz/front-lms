import React, { useState } from "react";
import { motion } from "framer-motion";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";
import icon4 from "../../assets/icon4.svg";
import icon5 from "../../assets/icon5.svg";
import icon6 from "../../assets/icon6.svg";
import Icon from "../../pages/opening-window/Icon";
import bgpink from "../../assets/backgroundpink.svg";
// import "./HomeHero.css";
import herobg from "../../assets/herobg.jpg";
import { useNavigate } from "react-router-dom";

function HomeHero() {
  const navigate = useNavigate();

  const iconData = [
    {
      src: icon1,
      className: "absolute w-17 h-17 lg:top-[30%] lg:left-[12%]",
      delay: 0,
    },
    {
      src: icon2,
      className: "absolute w-24 h-24 lg:top-[0%] lg:left-[0%]",
      delay: 0.2,
    },
    {
      src: icon3,
      className: "absolute w-24 h-24 lg:top-[45%] lg:left-[30%]",
      delay: 0.4,
    },
    {
      src: icon4,
      className: "absolute w-17 h-17 lg:top-[12%] lg:left-[31%]",
      delay: 0.6,
    },
    {
      src: icon5,
      className: "absolute w-24 h-24 lg:top-[0%] lg:left-[60%]",
      delay: 0.8,
    },
    {
      src: icon6,
      className: "absolute w-17 h-17 lg:top-[33%] lg:left-[60%]",
      delay: 1.0,
    },
  ];

  function Icon({ src, className, delay }) {
    return (
      <motion.img
        src={src}
        alt="icon"
        animate={{
          y: [0, -10, 0], // up-down motion
        }}
        transition={{
          delay,
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className={className}
      />
    );
  }

  const [isVisible, setIsVisible] = useState(true);

  return (
    <section
      className="w-full flex flex-col lg:flex-row-reverse h-screen mt-[80px] px-4 lg:py-15   
               bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${herobg})`,
        height: "calc(100vh - 100px)",
      }}
    >
      {/* Animation */}
      <div
        className={`hidden lg:block w-full relative lg:w-[40%]  transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {iconData.map((icon, index) => (
          <Icon
            key={index}
            src={icon.src}
            className={icon.className}
            delay={icon.delay}
          />
        ))}
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-[60%] px-2 py-15 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-ibm font-bold">
          Empowering Organizations and Students to Learn, Grow, and Lead
        </h1>
        <p className="text-lg md:text-lg mt-6 text-[#414141]">
          One Platform. Unlimited Possibilities.Designed for students,
          educators, and institutions.From AI mock interviews to real-time
          analytics-everything you need to learn, teach, and succeed is here.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center px-3 lg:justify-start gap-6 sm:gap-8 mt-10 lg:mt-14">
          <div className="w-[30%] lg:w-[20%] text-center bg-white/40 backdrop-blur-sm rounded-2xl px-2 py-2 sm:px-4 sm:py-2 shadow-lg border border-white/20">
            <div className="text-sm sm:text-xl md:text-xl font-bold bg-gradient-to-r from-violet-600 to-violet-300 bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-xxxs md:text-xxs text-gray-600 font-medium">
              Students
            </div>
          </div>
          <div className="w-[30%] lg:w-[20%] text-center bg-white/40 backdrop-blur-sm rounded-2xl px-2 py-2 sm:px-4 sm:py-2 shadow-lg border border-white/20">
            <div className="text-sm sm:text-2xl md:text-xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
              500+
            </div>
            <div className="text-xxs text-gray-600 font-medium">Courses</div>
          </div>
          <div className="w-[30%] lg:w-[20%] text-center bg-white/40 backdrop-blur-sm rounded-2xl px-2 py-2 sm:px-4 sm:py-2 shadow-lg border border-white/20">
            <div className="text-sm sm:text-2xl md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              95%
            </div>
            <div className="text-xxs text-gray-600 font-medium">
              Success Rate
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 lg:mt-32 justify-center sm:justify-start">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#9D5CFF] w-full md:w-2/5 cursor-pointer rounded-2xl px-6 py-1.5 text-white font-semibold text-sm"
          >
            Begin Your Learning Journey →
          </button>
          <button
            onClick={() => navigate("/orghome")}
            className="cursor-pointer border border-[#838383] w-full md:w-2/5 rounded-2xl px-6 py-1.5 font-semibold text-sm"
          >
            I’m an Organization
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
