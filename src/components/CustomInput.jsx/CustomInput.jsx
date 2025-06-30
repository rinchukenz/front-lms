import React from "react";

function CustomInput({ label, type, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}

export default CustomInput;
