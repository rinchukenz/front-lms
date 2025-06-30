import React from "react";
import SideOption from "../../components/SideOption/SideOption";
import { Link, useLocation } from "react-router-dom";
import dashboard from "../../assets/dashboard.svg";
import book from "../../assets/book-solid.svg";
import assignment from "../../assets/assignment.svg";
import calendar from "../../assets/calendar.svg";
import exam from "../../assets/exam.svg";
import skyllx from "../../assets/skyllx.png";
import certificate from "../../assets/certificate.svg";
import settings from "../../assets/settings.svg";
import speaker from "../../assets/speaker.svg";

function InstructorSidebar() {
  const location = useLocation();

  // Map pathnames to active option names
  const getActiveOption = () => {
    if (location.pathname.includes("my-courses")) return "My Courses";
    if (location.pathname === "/instructor") return "Dashboard";
    if (location.pathname.includes("assessments")) return "Assessments";
    if (location.pathname.includes("students")) return "Students";
    if (location.pathname.includes("live-class")) return "Live Class";
    if (location.pathname.includes("grades")) return "Grades";
    if (location.pathname.includes("schedule")) return "Schedule";
    if (location.pathname.includes("settings")) return "Settings";
    return "";
  };

  const activeOption = getActiveOption();

  return (
    <div className="h-full w-full flex flex-col items-center py-6 gap-12 bg-gray-100">
      <div className="flex items-center gap-2">
        <img src={skyllx} alt="Skyllx Logo" className="w-14 h-6 mt-1" />
        <div>
          <h3 className="font-bold text-xl">Instructor</h3>
          <h4 className="text-sm">Skyllx Institute</h4>
        </div>
      </div>
      <div className="options">
        <Link to="/instructor">
          <SideOption
            text="Dashboard"
            icon={dashboard}
            isActive={activeOption === "Dashboard"}
          />
        </Link>

        <Link to="/instructor/my-courses">
          <SideOption
            text="My Courses"
            icon={book}
            isActive={activeOption === "My Courses"}
          />
        </Link>

        <Link to="/instructor/students">
          <SideOption
            text="Students"
            icon={assignment}
            isActive={activeOption === "Students"}
          />
        </Link>

        <Link to="/instructor/assessments">
          <SideOption
            text="Assessments"
            icon={exam}
            isActive={activeOption === "Assessments"}
          />
        </Link>

        <Link to="/instructor/live-class">
          <SideOption
            text="Live Class"
            icon={calendar}
            isActive={activeOption === "Live Class"}
          />
        </Link>

        <Link to="/instructor/grades">
          <SideOption
            text="Grades"
            icon={speaker}
            isActive={activeOption === "Grades"}
          />
        </Link>

        <Link to="/instructor/schedule">
          <SideOption
            text="Schedule"
            icon={certificate}
            isActive={activeOption === "Schedule"}
          />
        </Link>

        <Link to="/instructor/settings">
          <SideOption
            text="Settings"
            icon={settings}
            isActive={activeOption === "Settings"}
          />
        </Link>

        <Link to="/login">
          <button className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out">
            Sign out
          </button>
        </Link>
        
      </div>
    </div>
  );
}

export default InstructorSidebar;
