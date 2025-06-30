import React from "react";
import InstructorSidebar from "./InstructorSidebar";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function InstructorHome() {
  return (
    <div>
      <div className="flex h-screen">
        <div className="w-1/6 h-screen fixed hidden md:block">
          <InstructorSidebar />
        </div>
        <div className="ml-0 md:ml-[16.666667%] w-full md:w-5/6 flex flex-col h-screen">
          <div className="fixed top-0 left-0 md:left-[16.666667%] w-full md:w-5/6 z-10">
            <Navbar />
          </div>
          <div className="mt-[64px] overflow-y-auto h-full pb-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorHome;
