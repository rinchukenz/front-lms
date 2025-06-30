import React from "react";
import SideOption from "../SideOption/SideOption";
import dashboard from "../../assets/dashboard.svg";
import book from "../../assets/book-solid.svg";
import assignment from "../../assets/assignment.svg";
import calendar from "../../assets/calendar.svg";
import exam from "../../assets/exam.svg";
import skyllx from "../../assets/skyllx.png";
import certificate from "../../assets/certificate.svg";
import settings from "../../assets/settings.svg";
import speaker from "../../assets/speaker.svg";

function Sidebar({ isOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-1/2 md:hidden bg-gray-100 p-4 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex items-center gap-2 mb-10">
        <img src={skyllx} alt="Skyllx Logo" className="w-14 h-6 mt-1" />
        <h3 className="font-bold text-2xl">LMS</h3>
      </div>
      <SideOption text="Dashboard" icon={dashboard} />
      <SideOption text="Courses" icon={book} />
      <SideOption text="Assignments" icon={assignment} />
      <SideOption text="Exams" icon={exam} />
      <SideOption text="Calendar" icon={calendar} />
      <SideOption text="Announcement" icon={speaker} />
      <SideOption text="Certificates" icon={certificate} />
      <SideOption text="Settings" icon={settings} />
    </div>
  );
}

export default Sidebar;
