import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import shuttle from "../assets/shuttle.png";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import pic1 from "../assets/icon1.svg";
import pic2 from "../assets/icon2.svg";
import pic3 from "../assets/icon3.svg";
import pic4 from "../assets/icon4.svg";
import pic5 from "../assets/icon5.svg";
import pic6 from "../assets/icon6.svg";
import Icon from "../components/Animation-icon/Icon";
import GradientButton from "./GradientButton";
import {
  BookOpen,
  GraduationCap,
  Brain,
  Lightbulb,
  Trophy,
  Star,
  Rocket,
  Users,
  Target,
  Zap,
} from "lucide-react";

function OpenWindow() {
  const navigate = useNavigate();
  const iconsRef = useRef([]);

  const iconData = [
    { src: pic1, className: "top-[100px] left-[5%] w-11 h-11", delay: 0 },
    { src: pic2, className: "top-[120px] left-[30%] w-12 h-12", delay: 0.2 },
    { src: pic3, className: "top-[40px] left-[50%] w-14 h-14", delay: 0.4 },
    { src: pic4, className: "top-[50px] left-[80%] w-13 h-13", delay: 0.6 },
    { src: pic5, className: "top-[25px] left-[15%] w-15 h-15", delay: 0.8 },
    { src: pic6, className: "top-[110px] left-[65%] w-15 h-15", delay: 1.0 },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function goToLogin() {
    navigate("/login");
  }
  function goToSignUp() {
    navigate("/signup");
  }

  return (
    <div className="CONTAINER min-h-screen flex flex-col items-center sm:items-center sm:justify-center px-6 py-10 bg-[#FFFFFF">
      {/* Responsive container */}
      <div className="TOP-CONTAINER w-full max-w-5xl flex flex-col sm:flex-col sm:px-1 md:flex-row items-center md:items-start gap-8 md:gap-16">
        {/* Animation section */}
        <div className="ANIMATION-CONTAINER relative w-full sm:w-full h-60 sm:h-60 md:w-1/2 md:h-60">
          {iconData.map((icon, index) => (
            <Icon
              key={index}
              src={icon.src}
              className={icon.className}
              delay={icon.delay}
            />
          ))}
        </div>

        {/* Text section */}
        <div
          className={`flex-1 text-center lg:text-left transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                Start{" "}
                <span className="bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-pulse drop-shadow-sm">
                  Learning
                </span>
                <br />
                <span className="text-gray-800 drop-shadow-sm">
                  Your Course
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed font-medium">
                Discover a world of knowledge with our interactive learning
                platform. Join thousands of students on their journey to
                success.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 py-4 sm:py-6">
              <div className="text-center bg-white/40 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg border border-white/20">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 to-violet-300 bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Active Students
                </div>
              </div>
              <div className="text-center bg-white/40 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg border border-white/20">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Courses
                </div>
              </div>
              <div className="text-center bg-white/40 backdrop-blur-sm rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg border border-white/20">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  95%
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="TEXT-CONTAINER w-full sm:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-sans font-semibold leading-tight">
            Start{" "}
            <span className="bg-gradient-to-r from-violet-500 to-pink-400 text-transparent bg-clip-text">
              Learning
            </span>{" "}
            <br />
            to your Course
          </h1>
        </div> */}
      </div>

      {/* Buttons section */}
      <div
        className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-12 sm:mt-16 transform transition-all duration-1000 delay-600 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <GradientButton
          text="Get Started"
          variant="primary"
          Icon={Rocket}
          onClick={goToSignUp}
          className="min-w-[180px] sm:min-w-[200px] cursor-pointer shadow-xl hover:shadow-2xl"
        />
        <GradientButton
          text="Sign In"
          variant="secondary"
          Icon={Users}
          onClick={goToLogin}
          className="min-w-[180px] sm:min-w-[200px] cursor-pointer shadow-lg hover:shadow-xl"
        />
      </div>
      {/* <div className="BUTTONS-CONTAINER w-full max-w-xs mt-10 flex flex-col gap-4 sm:flex-row sm:gap-8 sm:max-w-xl justify-center">
        <CustomButton
          icon={shuttle}
          text="Get Started"
          className="cursor-pointer flex-1 min-w-0 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-violet-500 hover:bg-violet-600 rounded-lg shadow-md whitespace-nowrap"
          action={goToSignUp}
        />
        <CustomButton
          text="Add an existing account"
          className="cursor-pointer flex-1 min-w-0 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-black bg-violet-100 hover:bg-violet-200 border border-violet-300 rounded-lg shadow-md whitespace-nowrap"
          action={goToLogin}
        />
      </div> */}
    </div>
  );
}

export default OpenWindow;
