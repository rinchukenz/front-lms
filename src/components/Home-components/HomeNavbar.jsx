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
    <nav className="w-full bg-black fixed top-0 z-50 shadow-sm">
      <div className="h-[80px] px-4 sm:px-6 md:px-10 lg:px-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex flex-col justify-center">
          <img src={logo} alt="logo" className="w-[140px] h-12 -ml-2 -mt-1" />
          <span className="text-[10px] text-white font-semibold leading-none">
            grow higher, get hire
          </span>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center border border-[#606060] rounded-full px-3 py-2 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[360px]">
          <input
            type="text"
            placeholder="Looking to learn something new?"
            className="bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none w-full px-2"
          />
          <img src={search} alt="search" className="w-4 h-4" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-white">
          <span
            onClick={() => navigate("/login/student")}
            className="cursor-pointer hover:text-violet-500"
          >
            Explore
          </span>
          <span
            onClick={() => navigate("/orghome")}
            className="cursor-pointer hover:text-violet-500"
          >
            Organization
          </span>
          <span
            onClick={() => navigate("/login/student")}
            className="cursor-pointer hover:text-violet-500"
          >
            Careers
          </span>
          <img src={cart} alt="cart" className="w-5 h-5 cursor-pointer" />
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => navigate("/login/student")}
            className="px-4 py-2 text-xs bg-[#9D5CFF] text-white rounded-md hover:bg-violet-700"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 text-xs border border-gray-500 text-white rounded-md hover:bg-gray-800"
          >
            Sign Up
          </button>
          <div className="border border-[#ABABAB] rounded-full p-2">
            <img src={language} alt="language" className="w-5 h-5" />
          </div>
        </div>

        {/* Hamburger - Mobile */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white text-gray-800 px-4 pb-4 space-y-4 text-sm font-medium">
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
            onClick={() => navigate("/signup")}
            className="w-full px-4 py-2 text-sm border border-violet-600 text-violet-600 rounded-md hover:bg-violet-50"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login/student")}
            className="w-full px-4 py-2 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700"
          >
            Log In
          </button>
        </div>
      )}
    </nav>
  );
}

export default HomeNavbar;
