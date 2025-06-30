import React, { useState } from "react";
import CustomInput from "../CustomInput.jsx/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  //const [role, setRole] = useState("");

  // const user = {
  //   name: name,
  //   email: email,
  //   password: password,
  //   phoneNumber: phoneNumber,
  //   role: role,
  // };

  //console.log(user);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("Registration successfull...! waiting for confirmation")

    // if (!role) {
    //   alert("Please select a role.");
    //   return;
    // }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const user = {
      name,
      email,
      password,
      phoneNumber,
      organizationName,
      //role,
    };

    console.log(user);
    

    try {
      const res = await axios.post(
        "http://localhost:8080/api/admins/register",
        { name, email, password, organizationName, phoneNumber}
        
      );

      const {info} = res.data;

      console.log(info);

      navigate("/login");

    } catch (err) {
      alert("Signup failed");
    }
  };

  function goToLogin() {
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-300 via-pink-200 to-white">
      <div
        className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-4 flex flex-col justify-evenly"
        style={{ height: "90vh" }}
      >
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-violet-400 mb-1">Sign up</h2>
          <p className="text-xs text-violet-400 mb-3">
            Create your account to get started with LMS
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-2">
          <CustomInput
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomInput
            label="Email"
            type="email"
            placeholder="Enter your email"
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
          <CustomInput
            label="Contact No"
            type="tel"
            placeholder="Enter your mobile number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <CustomInput
            label="Organization/College"
            type="text"
            placeholder="Enter your Organization/College name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />

          {/* Role Selection */}
          {/* <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-1 text-sm text-gray-600">
              <input
                type="radio"
                name="role"
                value="ORG_ADMIN"
                checked={role === "ORG_ADMIN"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
            <label className="flex items-center gap-1 text-sm text-gray-600">
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
              />
              Student
            </label>
          </div> */}

          <CustomButton
            text="Sign up"
            type="submit"
            action={handleSubmit}
            className="w-full cursor-pointer bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold py-2 rounded-xl mt-8"
          />

        </form>

        {/* Footer */}
        <div className="mt-2">
          <div className="flex items-center gap-2 my-3">
            <hr className="flex-1 border-gray-300" />
            <span className="text-xs text-gray-500">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <p className="text-center text-xs text-gray-500">
            Already have an Account?{" "}
            <button
              className="text-violet-500 hover:underline cursor-pointer"
              onClick={goToLogin}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
