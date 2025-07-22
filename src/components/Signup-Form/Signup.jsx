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
import { toast } from "react-toastify";
import Select from "react-select";
import { countryCodes } from "../../assets/countrycode";

function Signup() {
 

  const [otp, setOtp] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  //console.log(user);

  const navigate = useNavigate();

  const handleOtpSend = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/request-otp", {
        mobile: countryCode + mobile,
      });
      setOtpSend(true);
      toast.success("OTP send successfully");
    } catch (err) {
      toast.warning("OTP not send");
    }
  };

  const handleOtpVerify = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/verify-otp", {
        mobile,
        otp,
      });
      setOtpSend(false);
      setOtpVerified(true);
      toast.success("OTP verified successfully");
    } catch (err) {
      toast.warning("OTP not Verified");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // const user = {
    //   name,
    //   email,
    //   password,
    //   phoneNumber,
    // };

    //console.log(user);

    try {
      const res = await axios.post("http://localhost:8080/api/users/register", {
        name,
        email,
        password,
        mobile,
      });

      const { info } = res.data;

      console.log(info);

      navigate("/login");
    } catch (err) {
      alert("Signup failed");
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
          onClick={() => navigate("/")}
        />

        {/* Text */}
        <div className="flex flex-col w-2/3 gap-3 mx-auto h-full justify-center text-center text-white">
          <h1 className="text-white text-4xl font-sans text-left font-semibold">
            Sign up
          </h1>
          <p className="text-white font-semibold text-left font-sans">
            Create your account to get started with LMS{" "}
          </p>
        </div>

        {/* Dots */}
        <div className="absolute bottom-25 left-2/5 flex gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500"></span>
          <span className="w-3 h-3 rounded-full bg-white/50"></span>
          <span className="w-3 h-3 rounded-full bg-white/50"></span>
        </div>
      </div>

      {/* OTP Container */}
      {!otpVerified && (
        <div className="w-full lg:w-1/2 bg-white p-6 space-y-5 my-auto">
          <div className="w-2/3 mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              OTP Verification
            </h2>
            <p className="text-sm text-gray-500 text-center">
              Enter your registered mobile number to receive a one-time
              password.
            </p>

            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="w-1/3">
                  <Select
                    options={countryCodes}
                    value={countryCodes.find((c) => c.value === countryCode)}
                    onChange={(selected) => setCountryCode(selected.value)}
                    className="text-xs"
                    styles={{
                      control: (base) => ({
                        ...base,
                        padding: "2px",
                        borderRadius: "0.375rem",
                        borderColor: "#d1d5db", // Tailwind border-gray-300
                      }),
                    }}
                    isSearchable
                  />
                </div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
                  placeholder="Enter mobile number"
                />
              </div>

              {otpSend && (
                <div className="space-y-4">
                  <CustomInput
                    label="OTP Number"
                    type="text"
                    placeholder="Enter the OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}

              <CustomButton
                text={otpSend ? "Verify OTP" : "Send OTP"}
                action={otpSend ? handleOtpVerify : handleOtpSend}
                className="w-full bg-gradient-to-r cursor-pointer from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-600 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
              />
            </div>

            <div className="text-center text-sm text-gray-400">
              {otpSend
                ? "Didn't receive the OTP?"
                : "We’ll send you a 6-digit code."}
            </div>
          </div>
        </div>
      )}

      {/* Form Container */}
      {otpVerified && (
        <div className="w-full lg:w-1/2 bg-white flex flex-col gap-4 justify-center px-8 sm:px-16 md:px-24 lg:px-32 py-10">
          <div className="text-black flex flex-col gap-3 mb-4">
            <h2 className="text-3xl font-semibold">Welcome to App Name</h2>
            <p className="text-xs">
              Join thousands of learners building their skills with our premium
              LMS content.{" "}
            </p>
            <p className="text-xs">🔐 Encrypted, secure, and built for you.</p>
          </div>

          <form className="flex flex-col gap-2">
            <CustomInput
              label="Name"
              type="text"
              placeholder="Enter your name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <CustomInput
              label="Confirm Password"
              type="password"
              placeholder="***********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* <CustomInput
              label="Phone Number"
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            /> */}
          </form>

          <span className="text-green-400">✅ mobile number verified</span>

          <div className="flex flex-col items-center gap-2 mt-6">
            <CustomButton
              text="Sign up"
              action={handleSubmit}
              className="cursor-pointer w-1/2 bg-violet-500 hover:bg-violet-600 text-white py-3 rounded-lg font-medium transition"
            />
            <div className="flex w-1/2 items-center gap-2 text-black text-xs mt-2">
              <hr className="flex-grow border-gray-200" />
              <span className="font-semibold">or</span>
              <hr className="flex-grow border-gray-200" />
            </div>

            <p className="text-center text-sm font-semibold text-gray-500 mt-4">
              Already have an Account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-violet-500 hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
