import React, { useState } from "react";
import loginImage from "../../assets/login-leftbg.jpg";
import loginman from "../../assets/login-man.svg";
import back from "../../assets/backbutton.png";
import { useNavigate } from "react-router-dom";
import StudentLogin from "./StudentLogin";

function LoginStudent() {
  const navigate = useNavigate();

  return (
    <div className="max-h-screen min-h-screen flex flex-col lg:flex-row">
      {/* Image Container */}
      <div
        className="hidden lg:block relative lg:w-1/2"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Back Button */}
        <img
          className="absolute w-12 h-12 top-15 left-25 cursor-pointer"
          src={back}
          alt=""
          onClick={() => navigate("/")}
        />

        {/* Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 mx-auto text-white">
          <div className="flex items-baseline gap-4">
            <h1 className="text-white text-4xl font-sans text-left font-semibold">
              Sign In
            </h1>
            <img className="w-50 h-50" src={loginman} alt="" />
          </div>
          <p className="text-white font-semibold text-left font-sans">
            Sign in to enjoy the best managing experience
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col gap-5 justify-center px-8 sm:px-16 md:px-24 lg:px-32 py-10">
        {/* Welcome Texts */}
        <div className="text-black flex flex-col gap-4 mb-6">
          <h2 className="text-4xl font-semibold">Welcome Back</h2>
          <p className="text-sm">
            Continue your learning journey with App name LMS.
          </p>
          <p className="text-xs">
            🚀 Access your courses, track progress, and grow your skills
            securely.
          </p>
        </div>

        {/* ADMIN or USER form */}
        <StudentLogin />
      </div>
    </div>
  );
}

export default LoginStudent;
