import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import WebSidebar from "../components/WebSidebar/WebSidebar";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";


function Home() {
  return (
    <div className="flex h-screen">
      <div className="w-1/6 h-screen fixed hidden md:block">
        <WebSidebar />
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
  );
}

export default Home;
