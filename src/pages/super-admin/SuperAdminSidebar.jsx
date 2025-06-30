import React from "react";
import SideOption from "../../components/SideOption/SideOption";
import { Link, useLocation } from "react-router-dom";
import dashboard from "../../assets/dashboard.svg";
import book from "../../assets/book-solid.svg";
import assignment from "../../assets/assignment.svg";
import calendar from "../../assets/calendar.svg";
import exam from "../../assets/exam.svg";
import certificate from "../../assets/certificate.svg";
import settings from "../../assets/settings.svg";
import speaker from "../../assets/speaker.svg";
import LogOutButton from "../../components/LogOutButton";

function SuperAdminSidebar() {
  const location = useLocation();

  const getActiveOption = () => {
    if (location.pathname.includes("admin-requests")) return "Admin Requests";
    if (location.pathname === "/superadmin") return "Dashboard";
    if (location.pathname.includes("admin-management"))
      return "Admin Management";
    if (location.pathname.includes("org-admins")) return "Org Admins";
    if (location.pathname.includes("organizations")) return "Organizations";
    if (location.pathname.includes("live-class")) return "Live Class";
    if (location.pathname.includes("grades")) return "Grades";
    if (location.pathname.includes("schedule")) return "Schedule";
    if (location.pathname.includes("settings")) return "Settings";
    return "";
  };

  const activeOption = getActiveOption();

  return (
    <div className="h-full w-full flex flex-col items-center py-6 gap-8 bg-[#F9F9F9] border-r border-[#B8B8B8] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div>
          <h3 className="font-bold text-lg">Super Admin</h3>
          <p className="text-xs text-gray-800">LMS Control Panel</p>
        </div>
      </div>

      {/* Options */}
      <div className="w-full px-4 space-y-2">
        <Link to="/superadmin">
          <SideOption
            text="Dashboard"
            icon={dashboard}
            isActive={activeOption === "Dashboard"}
            color="black"
          />
        </Link>

        <Link to="/superadmin/organizations">
          <SideOption
            text="Organizations"
            icon={assignment}
            isActive={activeOption === "Organizations"}
            color="black"
          />
        </Link>

        <Link to="/superadmin/org-admins">
          <SideOption
            text="Org Admins"
            icon={book}
            isActive={activeOption === "Org Admins"}
            color="black"
          />
        </Link>

        <Link to="/superadmin/settings">
          <SideOption
            text="Settings"
            icon={settings}
            isActive={activeOption === "Settings"}
            color="black"
          />
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t w-4/5 border-gray-700">
        <LogOutButton />
      </div>
    </div>
  );
}

export default SuperAdminSidebar;
