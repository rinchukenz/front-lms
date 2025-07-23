import React from "react";

function SideOption({ text, Icon, onClick, isActive }) {
  return (
    <div
      className={`group w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg cursor-pointer transition-all duration-300
        text-xs font-medium
        ${
          isActive
            ? "bg-[#9D5CFF] text-white font-semibold"
            : "text-black hover:bg-[#9D5CFF] hover:text-white"
        }
      `}
      onClick={onClick}
    >
      {Icon && <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-black group-hover:text-white"}`} />}
      <span>{text}</span>
    </div>
  );
}

export default SideOption;
