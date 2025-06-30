import React from "react";
import { useAuth } from "../context/AuthContext";

const LogOutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="w-full cursor-pointer text-center bg-red-500 hover:bg-red-700 text-black font-medium py-2 rounded-xl transition-all duration-200"
    >
      Sign out
    </button>
  );
};

export default LogOutButton;
