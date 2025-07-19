import React from "react";
import { Link, useLocation } from "react-router-dom";
import SideOption from "../../components/SideOption/SideOption";
import LogOutButton from "../../components/LogOutButton";

import {
  LayoutDashboard,
  BookOpen,
  FileText,
  FileSignature,
  CalendarDays,
  BadgeCheck,
  Settings,
  Megaphone,
} from "lucide-react";

function StudentSidebar() {
  const location = useLocation();

  const getActiveOption = () => {
    if (location.pathname === "/student") return "Dashboard";
    if (location.pathname.includes("courses")) return "Courses";
    if (location.pathname.includes("assignments")) return "Assignments";
    if (location.pathname.includes("exams")) return "Exams";
    if (location.pathname.includes("calendar")) return "Calendar";
    if (location.pathname.includes("announcement")) return "Announcement";
    if (location.pathname.includes("certificates")) return "Certificates";
    if (location.pathname.includes("settings")) return "Settings";
    return "";
  };

  const activeOption = getActiveOption();

  return (
    <div className="h-full w-full flex flex-col items-center py-6 gap-8 bg-[#F9F9F9] border-r border-[#B8B8B8] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="font-bold text-xl text-black">Student Panel</h3>
        <h4 className="text-sm text-gray-700">LMS Portal</h4>
      </div>

      {/* Sidebar Options */}
      <div className="options w-full px-2">
        <Link to="/student">
          <SideOption
            text="Dashboard"
            Icon={LayoutDashboard}
            isActive={activeOption === "Dashboard"}
          />
        </Link>

        <Link to="/student/courses">
          <SideOption
            text="Courses"
            Icon={BookOpen}
            isActive={activeOption === "Courses"}
          />
        </Link>

        <Link to="/student/assignments">
          <SideOption
            text="Assignments"
            Icon={FileText}
            isActive={activeOption === "Assignments"}
          />
        </Link>

        <Link to="/student/exams">
          <SideOption
            text="Exams"
            Icon={FileSignature}
            isActive={activeOption === "Exams"}
          />
        </Link>

        <Link to="/student/calendar">
          <SideOption
            text="Calendar"
            Icon={CalendarDays}
            isActive={activeOption === "Calendar"}
          />
        </Link>

        <Link to="/student/announcement">
          <SideOption
            text="Announcement"
            Icon={Megaphone}
            isActive={activeOption === "Announcement"}
          />
        </Link>

        <Link to="/student/certificates">
          <SideOption
            text="Certificates"
            Icon={BadgeCheck}
            isActive={activeOption === "Certificates"}
          />
        </Link>

        <Link to="/student/settings">
          <SideOption
            text="Settings"
            Icon={Settings}
            isActive={activeOption === "Settings"}
          />
        </Link>

        {/* Logout */}
        {/* <div className="mt-auto pt-6 border-t w-4/5 border-gray-700">
          <LogOutButton />
        </div> */}
      </div>
    </div>
  );
}

export default StudentSidebar;
