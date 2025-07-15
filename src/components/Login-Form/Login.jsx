import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import CustomInput from "../CustomInput.jsx/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import google from "../../assets/google.png";
import loginImage from "../../assets/loginbg.jpg";
import back from "../../assets/backbutton.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { token } = res.data;
      const decoded = jwtDecode(token);
      const {
        role,
        sub: user,
        id: adminId,
        name,
        organizationId,
        organizationName,
      } = decoded;

      //console.log(token);
      console.log(decoded);
      //console.log(role, user, name, organizationId, organizationName);

      localStorage.setItem("token", token); // ✅ store token

      setAuth({
        isLoggedIn: true,
        user,
        adminId,
        role,
        token,
        name,
        organizationId,
        organizationName,
      });

      switch (role) {
        case "SUPER_ADMIN":
          navigate("/superadmin");
          break;
        case "instructor":
          navigate("/instructor");
          break;
        case "student":
          navigate("/student");
          break;
        case "ORG_ADMIN":
          navigate("/orgadmin");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      alert("Login failed");
    }
  };
  return (
    <div className="max-h-screen min-h-screen flex flex-col lg:flex-row">
      {/* Image Container */}
      <div
        className="hidden lg:block relative lg:w-1/2 lg:h-auto"
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
        />

        {/* Text */}
        <div className="flex flex-col w-2/3 gap-3 mx-auto h-full justify-center text-center text-white">
          <h1 className="text-white text-4xl font-sans text-left font-semibold">
            Sign In
          </h1>
          <p className="text-white font-semibold text-left font-sans">
            Sign in to enjoy the best managing experience
          </p>
        </div>

        {/* Dots */}
        <div className="absolute bottom-25 left-2/5 flex gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500"></span>
          <span className="w-3 h-3 rounded-full bg-white/50"></span>
          <span className="w-3 h-3 rounded-full bg-white/50"></span>
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col gap-5 justify-center px-8 sm:px-16 md:px-24 lg:px-32 py-10">
        <div className="text-black flex flex-col gap-4 mb-6">
          <h2 className="text-4xl font-semibold">Welcome Back 👋</h2>
          <p className="text-sm">
            Continue your learning journey with App name LMS.
          </p>
          <p className="text-xs">
            🚀 Access your courses, track progress, and grow your skills
            securely.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <CustomInput
            label="Email"
            type="email"
            placeholder="Enter your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            label="Password"
            type="password"
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-violet-600" />
              Remember me
            </label>
            <a href="#" className="text-violet-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="flex flex-col items-center gap-6 mt-6">
          <CustomButton
            text="Sign in"
            action={handleClick}
            className="cursor-pointer w-1/2 bg-violet-500 hover:bg-violet-600 text-white py-3 rounded-lg font-medium transition"
          />
          <div className="flex w-1/2 items-center gap-2 text-black text-xs mt-2">
            <hr className="flex-grow border-gray-200" />
            <span className="font-semibold">or login with</span>
            <hr className="flex-grow border-gray-200" />
          </div>
          <CustomButton
            icon={google}
            text="Google"
            className="cursor-pointer w-1/2 border rounded-lg flex items-center justify-center gap-2 py-3 hover:bg-gray-50 transition"
          />
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an Account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-violet-500 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
