import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/highrr.jpg";
import language from "../../assets/language.png";
import cart from "../../assets/cart.png";
import search from "../../assets/search-icon.png";

function HomeNavbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-black shadow-sm fixed top-0 z-50">
      <div className="h-[80px] px-4 md:px-12 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex flex-col justify-center">
          {/* <h2 className="font-semibold text-2xl text-violet-500">HIGHRR</h2> */}
          <img src={logo} alt="" className="w-45 h-12 ml-[-22px] mt-[-5px]" />
          <span className="text-xxs font-semibold text-white">
            grow higher, get hire
          </span>
        </div>

        {/* Search bar */}
        <div className="border border-[#606060] rounded-4xl w-[30%] h-[80%] flex items-center px-2">
          <input type="text" placeholder="Looking to learn something new?" className="rounded-2xl px-2 text-white text-sm w-full outline-0" />
          <img src={search} alt="" className="w-5 h-5" />
        </div>

        {/* Menu Section - Desktop */}
        <div className="hidden md:flex space-x-10 text-sm text-white font-medium">
          <span onClick={() => navigate("/login/student")} className="cursor-pointer hover:text-violet-600">Student</span>
          <span onClick={() => navigate("/orghome")} className="cursor-pointer hover:text-violet-600">
            Organization
          </span>
          <img src={cart} alt="" className="w-6 h-6" />
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 text-sm  bg-violet-600 text-white rounded-md"
          >
            Sign Up
          </button>
          <button className="px-4 py-2 text-sm border border-[#606060] text-white rounded-md">
            Log In
          </button>
          <div className="border border-[#ABABAB] rounded-full p-2">
            <img src={language} alt="" className="w-6 h-6" />
          </div>
        </div>

        {/* Hamburger Icon - Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm text-gray-700 font-medium bg-white">
          <span className="block cursor-pointer hover:text-violet-600">
            Resources
          </span>
          <span className="block cursor-pointer hover:text-violet-600">
            How we do it
          </span>
          <span className="block cursor-pointer hover:text-violet-600">
            Features
          </span>
          <span className="block cursor-pointer hover:text-violet-600">
            Pricing
          </span>

          <hr className="my-2" />

          <button
            onClick={() => navigate("/open-screen")}
            className="w-full px-4 py-2 text-sm border border-violet-600 text-violet-600 rounded-md hover:bg-violet-50"
          >
            Sign Up
          </button>
          <button className="w-full px-4 py-2 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700">
            Log In
          </button>
        </div>
      )}
    </nav>
  );
}

export default HomeNavbar;
