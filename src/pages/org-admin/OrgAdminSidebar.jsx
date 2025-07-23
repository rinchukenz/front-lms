import React from "react";
import { Link, useLocation } from "react-router-dom";
// import SideOption from "../../components/SideOption/SideOption";
import skyllx from "../../assets/skyllx.png";
// import LogOutButton from "../../components/LogOutButton";
import {
  MdDashboard,
  MdGroups,
  MdSchool,
  MdAssignment,
  MdCalendarToday,
  MdPayments,
  MdLibraryBooks,
  MdCardMembership,
  MdSupportAgent,
  MdInsights,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import SideOption from "../../components/common-components/SideOption";

function OrgAdminSidebar() {
  const location = useLocation();

  const { auth } = useAuth();

  console.log(auth);
  console.log(auth.role);
  console.log(auth.user);

  const getActiveOption = () => {
    if (location.pathname.includes("/leaderboard")) return "Leaderboard";
    if (location.pathname === "/orgadmin") return "Dashboard";
    if (location.pathname.includes("/exams")) return "Exams";
    if (location.pathname.includes("/students")) return "Students";
    if (location.pathname.includes("/video-library")) return "Video Library";
    if (location.pathname.includes("/transactions")) return "Transactions";
    if (location.pathname.includes("/courses")) return "Courses";
    if (location.pathname.includes("/certificates")) return "Certificates";
    if (location.pathname.includes("/support")) return "Support";
    if (location.pathname.includes("/analytics")) return "Analytics";
    if (location.pathname.includes("/settings")) return "Settings";
    return "";
  };

  const activeOption = getActiveOption();

  return (
    <div className="h-full w-full flex flex-col items-center py-6 gap-8 bg-[#F9F9F9] border-r border-[#B8B8B8] overflow-y-auto">
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="font-bold text-xl text-black">
          {auth.organizationName}
        </h3>
        <h4>{auth.name}</h4>
      </div>

      <div className="options w-full px-2">
        <Link to="/orgadmin">
          <SideOption
            text="Admin Dashboard"
            Icon={MdDashboard}
            isActive={activeOption === "Dashboard"}
          />
        </Link>

        <Link to="/orgadmin/courses">
          <SideOption
            text="Courses"
            Icon={MdLibraryBooks}
            isActive={activeOption === "Courses"}
          />
        </Link>

        <Link to="/orgadmin/students">
          <SideOption
            text="Students"
            Icon={MdSchool}
            isActive={activeOption === "Students"}
          />
        </Link>

        <Link to="/orgadmin/leaderboard">
          <SideOption
            text="Leaderboard"
            Icon={MdGroups}
            isActive={activeOption === "Leaderboard"}
          />
        </Link>

         <Link to="/orgadmin/exams">
          <SideOption
            text="Exams"
            Icon={MdAssignment}
            isActive={activeOption === "Exams"}
          />
        </Link>

        <Link to="/orgadmin/video-library">
          <SideOption
            text="Video Library"
            Icon={MdCalendarToday}
            isActive={activeOption === "Video Library"}
          />
        </Link>
{/*

        <Link to="/orgadmin/transactions">
          <SideOption
            text="Transactions"
            Icon={MdPayments}
            isActive={activeOption === "Transactions"}
          />
        </Link>

        <Link to="/orgadmin/certificates">
          <SideOption
            text="Certificates"
            Icon={MdCardMembership}
            isActive={activeOption === "Certificates"}
          />
        </Link>

        <Link to="/orgadmin/support">
          <SideOption
            text="Support"
            Icon={MdSupportAgent}
            isActive={activeOption === "Support"}
          />
        </Link>

        <Link to="/orgadmin/settings">
          <SideOption
            text="Settings"
            Icon={MdSettings}
            isActive={activeOption === "Settings"}
          />
        </Link> */}

        {/* Logout */}
        {/* <div className="mt-auto pt-6 border-t w-4/5 border-gray-700">
          <LogOutButton />
        </div> */}
      </div>
    </div>
  );
}

export default OrgAdminSidebar;
