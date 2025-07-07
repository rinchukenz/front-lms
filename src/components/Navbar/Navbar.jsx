import React, { useState } from "react";
import bell from "../../assets/bell.svg";
import user from "../../assets/user.svg";
import menu from "../../assets/menuIcon.svg";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getHeaderTitle = () => {
    if (location.pathname.includes("/student/courses")) return "Courses";
    if (location.pathname.includes("my-courses")) return "My Courses";
    if (location.pathname.includes("students")) return "Students";
    if (location.pathname.includes("assignments")) return "Assignments";
    if (location.pathname.includes("exams")) return "Exams";
    if (location.pathname.includes("calendar")) return "Calendar";
    if (location.pathname.includes("announcement")) return "Announcement";
    if (location.pathname.includes("certificates")) return "Certificates";
    if (location.pathname.includes("settings")) return "Settings";
    if (location.pathname.includes("assessments")) return "Assessments";
    if (location.pathname.includes("live-class")) return "Live Class";
    if (location.pathname.includes("grades")) return "Grades";
    if (location.pathname.includes("schedule")) return "Schedule";
    if (location.pathname.includes("admin-requests")) return "Admin Requests";
    if (location.pathname.includes("admin-management")) return "Admin Management";
    if (location.pathname.includes("org-admins")) return "Organization Admins";
    if (location.pathname.includes("organizations")) return "Organizations";
    if (location.pathname.includes("/leaderboard")) return "Leaderboard";
    if (location.pathname.includes("transactions")) return "Transactions";
    if (location.pathname.includes("courses")) return "Courses";
    if (location.pathname.includes("support")) return "Support";
    if (location.pathname.includes("analytics")) return "Analytics";
    if (
      location.pathname === "/student" ||
      location.pathname === "/instructor" ||
      location.pathname === "/orgadmin" ||
      location.pathname === "/superadmin"
    )
      return "Dashboard";
    return "";
  };

  const headerTitle = getHeaderTitle();

  return (
    <div className="h-16 sm:h-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-white flex items-center justify-between">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-semibold text-black">
        {headerTitle}
      </h1>

      {/* Sidebar (hidden) */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Icons */}
      <div className="flex items-center gap-4">
        <img
          src={bell}
          className="w-6 h-6 p-1 hidden md:block hover:bg-purple-100 rounded-full cursor-pointer transition"
          alt="Notifications"
        />
        <img
          src={user}
          className="w-6 h-6 p-1 hidden md:block hover:bg-purple-100 rounded-full cursor-pointer transition"
          alt="Profile"
        />
        {/* Mobile menu icon */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
          <img
            src={menu}
            alt="Menu"
            className="w-6 h-6 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
