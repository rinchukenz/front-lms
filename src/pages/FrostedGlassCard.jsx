import React from "react";

function FrostedGlassCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900')" }}>
      <div className="backdrop-blur-sm bg-white/30 text-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome</h2>
        <p className="text-sm">
          This is a frosted glass effect using Tailwind CSS with backdrop-blur.
        </p>
      </div>
    </div>
  );
}

export default FrostedGlassCard;
