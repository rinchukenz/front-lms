import React from "react";
import { useNavigate } from "react-router-dom";

function HomeNavbar() {

    const navigate = useNavigate();

  return (
    <div className="h-[80px] px-12 py-4 flex items-center justify-between bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex flex-col justify-center">
        <h2 className="font-semibold text-2xl">HIGHRR</h2>
        <span className="text-xxs font-semibold">grow higher, get hire</span>
      </div>

      {/* Menu Section */}
      <div className="flex space-x-10 text-sm text-gray-700 font-medium">
        <span className="cursor-pointer hover:text-violet-600">Resources</span>
        <span className="cursor-pointer hover:text-violet-600">
          How we do it
        </span>
        <span className="cursor-pointer hover:text-violet-600">Features</span>
        <span className="cursor-pointer hover:text-violet-600">Pricing</span>
      </div>

      {/* Auth Buttons */}
      <div className="flex space-x-4">
        <button onClick={() => navigate("/open-screen")} className="px-4 py-2 text-sm border border-violet-600 text-violet-600 rounded-md hover:bg-violet-50">
          Sign Up
        </button>
        <button className="px-4 py-2 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700">
          Log In
        </button>
      </div>
    </div>
  );
}

export default HomeNavbar;
