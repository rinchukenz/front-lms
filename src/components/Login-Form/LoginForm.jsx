import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import CustomInput from "../CustomInput.jsx/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import google from "../../assets/google.png";

function LoginForm() {
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
      const { role, sub: user } = decoded;

      console.log(token);
      console.log(decoded);

      localStorage.setItem("token", token); // ✅ store token

      setAuth({
        isLoggedIn: true,
        user,
        role,
        token,
      });

      switch (role) {
        case "SUPER_ADMIN":
          navigate("/orgadmin");
          break;
        case "instructor":
          navigate("/instructor");
          break;
        case "student":
          navigate("/student");
          break;
        case "orgadmin":
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
    <div className="min-h-screen bg-gradient-to-b from-violet-300 via-pink-200 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-lg border border-gray-100">
        <div className="text-violet-400 p-6 bg-white">
          <h2 className="text-2xl font-bold mt-8">Go ahead and set up your account</h2>
          <p className="text-sm mt-1">Sign in to enjoy the best managing experience</p>
        </div>
        <div className="bg-white p-6 space-y-2">
          <form className="space-y-4">
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
            <CustomButton
              text="Sign in"
              action={handleClick}
              className="cursor-pointer w-full bg-violet-500 hover:bg-violet-600 text-white py-2 rounded-lg font-medium transition"
            />
          </form>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
            <hr className="flex-grow border-gray-200" />
            <span>or login with</span>
            <hr className="flex-grow border-gray-200" />
          </div>
          <CustomButton
            icon={google}
            text="Google"
            className="cursor-pointer w-full border rounded-lg flex items-center justify-center gap-2 py-2 hover:bg-gray-50 transition"
          />
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an Account?{" "}
            <a
              href=""
              className="text-violet-500 hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
