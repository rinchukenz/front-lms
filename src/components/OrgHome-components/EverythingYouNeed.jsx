import React, { useState } from "react";

const features = [
  {
    title: "AI Content Generator",
    description:
      "Create quizzes, notes, and assignments instantly with curriculum-aligned AI suggestions.",
  },
  {
    title: "MAANG Test Papers",
    description:
      "Access real placement papers from top recruiters like Infosys, Google, and TCS.",
  },
  {
    title: "60+ Language Coding Lab",
    description:
      "Create quizzes, notes, and assignments instantly with curriculum-aligned AI suggestions.",
  },
  {
    title: "Smart Dashboard",
    description:
      "Track student progress, generate reports, and monitor activity in real-time.",
  },
  {
    title: "Custom Assignments",
    description:
      "Easily create custom assignments and quizzes tailored to student needs.",
  },
  {
    title: "Live Classes Integration",
    description:
      "Seamlessly schedule and conduct live classes via Zoom, Google Meet, or in-app video.",
  },
  {
    title: "AI Content Generator",
    description:
      "Create quizzes, notes, and assignments instantly with curriculum-aligned AI suggestions.",
  },
  {
    title: "MAANG Test Papers",
    description:
      "Access real placement papers from top recruiters like Infosys, Google, and TCS.",
  },
  {
    title: "60+ Language Coding Lab",
    description:
      "Create quizzes, notes, and assignments instantly with curriculum-aligned AI suggestions.",
  },
  {
    title: "Smart Dashboard",
    description:
      "Track student progress, generate reports, and monitor activity in real-time.",
  },
  {
    title: "Custom Assignments",
    description:
      "Easily create custom assignments and quizzes tailored to student needs.",
  },
  {
    title: "Live Classes Integration",
    description:
      "Seamlessly schedule and conduct live classes via Zoom, Google Meet, or in-app video.",
  },
  // Add more features as needed
];

function EverythingYouNeed() {
  const [showAll, setShowAll] = useState(false);
  const visibleFeatures = showAll ? features : features.slice(0, 4);

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-10 px-6 sm:px-10 md:px-15 lg:px-24 bg-white">
      <h2 className="text-3xl md:text-4xl font-ibm font-semibold mb-10 md:mb-15 lg:mb-20">
        Everything You Need to Teach, Track & Transform{" "}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleFeatures.map((feature, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition duration-300"
          >
            <h3 className="font-ibm font-semibold text-lg md:text-2xl mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 font-inter text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 text-sm font-semibold cursor-pointer text-white bg-purple-600 hover:bg-purple-700 rounded-full transition duration-300"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      </div>
    </section>
  );
}

export default EverythingYouNeed;
