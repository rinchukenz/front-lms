import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bell, User, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
// import LogOutButton from "../LogOutButton";
// import CustomInput from "../CustomInput.jsx/CustomInput";
// import CustomButton from "../CustomButton/CustomButton";
import { toast } from "react-toastify";
import axios from "axios";
import LogOutButton from "./LogoutButton";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { studentAuth, auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSend, setOtpSend] = useState(false);

  const navigate = useNavigate();

  // Replace this with actual user data from context or props
  //const email = "student@example.com";

  //console.log(auth);

  const getHeaderTitle = () => {
    if (location.pathname.includes("/student/courses")) return "Courses";
    if (location.pathname.includes("my-courses")) return "My Courses";
    if (location.pathname.includes("students")) return "Students";
    if (location.pathname.includes("assignments")) return "Assignments";
    if (location.pathname.includes("exams")) return "Exams";
    if (location.pathname.includes("interviews")) return "AI Mock Interview";
    if (location.pathname.includes("calendar")) return "Calendar";
    if (location.pathname.includes("resume-builder")) return "Resume Builder";
    if (location.pathname.includes("certificates")) return "Certificates";
    if (location.pathname.includes("settings")) return "Settings";
    if (location.pathname.includes("assessments")) return "Assessments";
    if (location.pathname.includes("video-library")) return "Video Library";
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

  const handleOtpSend = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/request-reset-otp", {
        mobile,
      });
      console.log("OTP SEND");
      setOtpSend(true);
      toast.success("OTP send successfully");
    } catch (err) {
      console.error("Error sending OTP:", err.response?.data || err.message);
      toast.warning(err.response?.data?.message || "OTP not sent");
    }
  };

  const handleOtpVerify = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/reset-password", {
        mobile,
        otp,
        newPassword,
      });
      //setOtpSend(false);
      setShowModal(false);
      toast.success("Password changed successfully");
    } catch (err) {
      toast.warning("Failed to change password");
    }
  };

  const handleViewProfile = () => {
    navigate("/student/profile");
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
                  onClick={() => setShowModal(true)}
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white relative rounded-2xl p-8 w-full max-w-md shadow-xl border border-gray-200 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-violet-500 font-bold text-lg"
              aria-label="Close Modal"
            >
              X
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Reset Your Password
            </h2>
            <p className="text-sm text-gray-500 text-center">
              Enter your registered mobile number to receive an OTP.
            </p>

            {/* Phone Number Input */}
            <CustomInput
              label="Phone Number"
              type="tel"
              placeholder="Enter your number here"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            {/* OTP + New Password Inputs */}
            {otpSend && (
              <div className="space-y-4">
                <CustomInput
                  label="New Password"
                  type="password"
                  placeholder="***********"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <CustomInput
                  label="OTP Number"
                  type="text"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            {/* Submit Button */}
            <CustomButton
              text={otpSend ? "Verify OTP & Reset" : "Send OTP"}
              action={otpSend ? handleOtpVerify : handleOtpSend}
              className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
            />

            {/* Helper Text */}
            <p className="text-center text-sm text-gray-400">
              {otpSend
                ? "Didn't receive the OTP?"
                : "We'll send you a 6-digit code to reset your password."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
