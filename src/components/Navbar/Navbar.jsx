import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Bell, User, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import LogOutButton from "../LogOutButton";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { studentAuth, auth } = useAuth();

  // Replace this with actual user data from context or props
  //const email = "student@example.com";

  console.log(auth);

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
    if (location.pathname.includes("admin-management"))
      return "Admin Management";
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

  const handleSignOut = () => {
    console.log("Signing out...");
    // Clear localStorage, tokens, etc.
  };

  const handleResetPassword = () => {
    console.log("Reset Password clicked");
    // Open modal or navigate
  };

  const handleViewProfile = () => {
    console.log("View Profile clicked");
    // Navigate or show profile modal
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const role = auth?.role || studentAuth?.role || "USER";
  console.log(role);

  return (
    <div className="h-16 sm:h-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-white flex items-center justify-between relative">
      {/* Page Title */}
      <h1 className="text-xl sm:text-3xl font-semibold text-gray-800">
        {getHeaderTitle()}
      </h1>

      {/* Sidebar for mobile */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Right side icons */}
      <div className="flex items-center gap-4 relative">
        {/* Profile Icon + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <User
            className="w-6 h-6 text-gray-700 hidden md:block hover:text-violet-600 cursor-pointer transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border z-50 p-4 space-y-2">
              <div className="text-sm mb-2 font-semibold text-black">
                {studentAuth.email || auth.user}
              </div>
              {role !== "ORG_ADMIN" && (
                <button
                  onClick={handleViewProfile}
                  className="w-full text-left hover:bg-violet-500 hover:text-white px-3 py-2 rounded-md text-sm text-gray-800 transition"
                >
                  👤 View Profile
                </button>
              )}
              {role !== "ORG_ADMIN" && (
                <button
                  onClick={handleResetPassword}
                  className="w-full text-left hover:bg-violet-500 hover:text-white cursor-pointer px-3 py-2 rounded-md text-sm text-gray-800 transition"
                >
                  🔒 Reset Password
                </button>
              )}

              {/* <button
                onClick={handleSignOut}
                className="w-full text-left hover:bg-red-100 cursor-pointer px-3 py-2 rounded-md text-sm text-red-600 font-semibold transition"
              >
                🚪 Sign Out
              </button> */}
              <LogOutButton />
            </div>
          )}
        </div>

        {/* Mobile Sidebar Trigger */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden"
        >
          <Menu className="w-6 h-6 text-gray-700 hover:text-violet-600 transition" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
