import React from "react";
import bg from "../../assets/whatmakesyou_image_bg.png";
import img1 from "../../assets/AIINTERVIEW 1.png";
import img2 from "../../assets/CodeWatch 1.png";
import img3 from "../../assets/studentWatching 1.png";
import img4 from "../../assets/AI_CAM 1.png";

const WhatMakesHighrrDifferent = () => {
  const arr = [
    {
      img: img1,
      des: "Prepare for job interviews with AI-simulated questions and instant feedback to sharpen your skills and boost confidence.",
    },
    {
      img: img2,
      des: "Practice coding in real-time as you watch your course content — no need to switch tabs or tools. Learn and apply instantly.",
    },
    {
      img: img3,
      des: "Access a curated selection of courses from leading educators and institutions across the globe — all in one place.",
    },
    {
      img: img4,
      des: "Take exams confidently with our facial recognition, screen tracking, and AI-driven anti-cheating tools.",
    },
  ];

  return (
    <section className="bg-[#FDF7FD] px-6 lg:px-20 py-16">
      <div className="text-center mx-auto max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-ibm font-semibold mb-5">
          What Makes Highrr Different?
        </h1>
        <p className="text-[#414141] mb-10 md:px-40 max-w-4xl mx-auto font-inter text-sm md:text-lg lg:text-xl">
          Explore the powerful tools and smart features that set Highrr apart in
          preparing you for real-world success.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:w-3/4 mx-auto">
        {arr.map((item, index) => (
          <div key={index} className="flex flex-col items-center px-4">
            <img src={item.img} alt={`feature-${index}`} className="mb-3" />
            <p className="text-xs text-center">{item.des}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatMakesHighrrDifferent;
