import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import google from "../../assets/google.png";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import CustomInput from "../common-components/CustomInput";
import CustomButton from "../common-components/CustomButton";

function StudentLogin() {
  const { setStudentAuth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { email: mail, password },
        { withCredentials: true }
      );
      toast.success("Login Successfull");

      const { token, email, name, refreshToken } = response.data;
      const decoded = jwtDecode(token);
      const { sub: user, role, exp, iat } = decoded;

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("refreshToken", refreshToken);

      setStudentAuth({
        token,
        email,
        name,
        refreshToken,
      });

      console.log(role);

      if (role === "USER") {
        navigate("/student");
      }
    } catch (err) {
      toast.error("Login Failed");
    }
  };

  const handleOtpSend = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/request-reset-otp", {
        mobile,
      });
      setOtpSend(true);
      toast.success("OTP send successfully");
    } catch (err) {
      toast.warning("OTP not send");
    }
  };

  const handleOtpVerify = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/reset-password", {
        mobile,
        otp,
        newPassword,
      });
      setShowModal(false);
      toast.success("Password changed successfully");
    } catch (err) {
      toast.warning("Failed to change password");
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4">
        <CustomInput
          label="Email"
          type="email"
          placeholder="Enter your email here"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
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
          <a
            onClick={() => setShowModal(true)}
            href="#"
            className="text-violet-500 hover:underline"
          >
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

export default StudentLogin;
