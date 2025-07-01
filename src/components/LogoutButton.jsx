import React from "react";
import { useAuth } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";

const LogOutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="w-full cursor-pointer text-center text-red-500 hover:text-red-600 font-semibold py-2 transition-all duration-200"
    >
      <MdLogout className="inline-block mr-2" />
      Sign out
    </button>
  );
};

export default LogOutButton;
