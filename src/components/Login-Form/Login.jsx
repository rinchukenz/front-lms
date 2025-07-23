import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
// import CustomInput from "../CustomInput.jsx/CustomInput";
// import CustomButton from "../CustomButton/CustomButton";
import google from "../../assets/google.png";
import loginImage from "../../assets/loginbg.jpg";
import back from "../../assets/backbutton.png";
import CustomInput from "../common-components/CustomInput";
import CustomButton from "../common-components/CustomButton";

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
    <div>
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
  );
}

export default Login;
