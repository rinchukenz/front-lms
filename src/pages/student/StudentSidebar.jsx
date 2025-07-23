import React from "react";
import { Link, useLocation } from "react-router-dom";
import SideOption from "../../components/common-components/SideOption";
// import LogOutButton from "../../components/LogOutButton";

import {
  LayoutDashboard,
  BookOpen,
  FileText,
  FileSignature,
  CalendarDays,
  BadgeCheck,
  Settings,
  Mic,
  Users,
  Target,
  Code,
  FilePlus2,
  Archive,
  Briefcase,
} from "lucide-react";

function StudentSidebar() {
  const location = useLocation();

  const getActiveOption = () => {
    if (location.pathname === "/student") return "Dashboard";
    if (location.pathname.includes("courses")) return "Courses";
    if (location.pathname.includes("assignments")) return "Assignments";
    if (location.pathname.includes("exams")) return "Exams";
    if (location.pathname.includes("interviews")) return "AI Mock Interviews";
    if (location.pathname.includes("community")) return "Community";
    if (location.pathname.includes("interview-prep")) return "Interview Preparation";
    if (location.pathname.includes("coding-lab")) return "Coding Lab";
    if (location.pathname.includes("resume-builder")) return "Resume Builder";
    if (location.pathname.includes("paper-bank")) return "MAANG+MNC Paper Bank";
    if (location.pathname.includes("certificates")) return "Certificates";
    if (location.pathname.includes("jobs")) return "Jobs";
    if (location.pathname.includes("settings")) return "Settings";
    return "";
  };

  const activeOption = getActiveOption();

  return (
    <div className="h-full w-full flex flex-col items-center py-6 gap-8 bg-[#F9F9F9] border-r border-[#B8B8B8] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="font-bold text-lg text-black">Organization Name</h3>
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

        <Link to="/student/interviews">
          <SideOption
            text="AI Mock Interviews"
            Icon={Mic}
            isActive={activeOption === "AI Mock Interviews"}
          />
        </Link>

        <Link to="/student/community">
          <SideOption
            text="Community"
            Icon={Users}
            isActive={activeOption === "Community"}
          />
        </Link>

        <Link to="/student/interview-prep">
          <SideOption
            text="Interview Preparation"
            Icon={Target}
            isActive={activeOption === "Interview Preparation"}
          />
        </Link>

        <Link to="/student/coding-lab">
          <SideOption
            text="Coding Lab"
            Icon={Code}
            isActive={activeOption === "Coding Lab"}
          />
        </Link>

        <Link to="/student/resume-builder">
          <SideOption
            text="Resume Builder"
            Icon={FilePlus2}
            isActive={activeOption === "Resume Builder"}
          />
        </Link>

        <Link to="/student/paper-bank">
          <SideOption
            text="MAANG+MNC Paper Bank"
            Icon={Archive}
            isActive={activeOption === "MAANG+MNC Paper Bank"}
          />
        </Link>

        <Link to="/student/certificates">
          <SideOption
            text="Certificates"
            Icon={BadgeCheck}
            isActive={activeOption === "Certificates"}
          />
        </Link>

        <Link to="/student/jobs">
          <SideOption
            text="Jobs"
            Icon={Briefcase}
            isActive={activeOption === "Jobs"}
          />
        </Link>

        {/* Uncomment if using logout */}
        {/* 
        <div className="mt-auto pt-6 border-t w-4/5 border-gray-700">
          <LogOutButton />
        </div> 
        */}
      </div>
    </div>
  );
}

export default StudentSidebar;
