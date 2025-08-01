import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/highrr.jpg";
import { motion, AnimatePresence } from "framer-motion";
import language from "../../assets/language.png";

function HomeNavbarR() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-black shadow-sm fixed top-0 z-50">
      <div className="h-[80px] px-4 md:px-12 lg:px-18 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex flex-col justify-center">
          <img src={logo} alt="" className="w-45 h-12 ml-[-22px] mt-[-5px]" />
          <span className="text-xxs font-semibold text-white">
            grow higher, get hire
          </span>
        </div>

        {/* Menu Section - Desktop */}
        <div className="hidden lg:flex space-x-10 text-sm text-white font-medium">
          <span className="cursor-pointer hover:text-violet-600">
            Resources
          </span>
          <span className="cursor-pointer hover:text-violet-600">Features</span>
          <span className="cursor-pointer hover:text-violet-600">
            Testimonials
          </span>
          <span className="cursor-pointer hover:text-violet-600">
            Contact us
          </span>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex space-x-4">
          <button
            onClick={() => navigate("/login/admin")}
            className="px-4 py-1 text-xs bg-[#9D5CFF] text-white rounded-md hover:bg-violet-700"
          >
            Login
          </button>
          <div className="border border-[#ABABAB] rounded-full p-2">
            <img src={language} alt="language" className="w-5 h-5" />
          </div>
        </div>

        {/* Hamburger Icon - Mobile */}
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

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden px-4 pb-4 mb-4 pt-2 space-y-3 text-sm text-gray-700 font-medium bg-white shadow-md border border-gray-200 rounded-lg mx-4 mt-2"
          >
            <span className="block cursor-pointer hover:text-violet-600 transition-colors duration-200">
              Resources
            </span>
            <span className="block cursor-pointer hover:text-violet-600 transition-colors duration-200">
              Features
            </span>
            <span className="block cursor-pointer hover:text-violet-600 transition-colors duration-200">
              Testimonials
            </span>
            <span className="block cursor-pointer hover:text-violet-600 transition-colors duration-200">
              Contact us
            </span>

            <hr className="my-2 border-gray-200" />

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => navigate("/login/admin")}
                className="w-full sm:w-[30%] px-4 py-2 text-sm border border-[#ABABAB] text-black rounded-md hover:bg-violet-50 transition-colors duration-200"
              >
                Organization Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default HomeNavbarR;
