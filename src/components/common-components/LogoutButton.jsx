import React from "react";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

const LogOutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="w-full cursor-pointer text-right text-red-500 hover:text-red-600 font-semibold py-2 transition-all duration-200"
    >
      <MdLogout className="inline-block mr-2" />
      Sign out
    </button>
  );
};

export default LogOutButton;
