import React from "react";
import { Bot, Target, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: <Target className="w-10 h-10" />,
    title: "Learn the Skills That Matter",
    description:
      "Start strong with a curated set of beginner-friendly and job-focused courses in AI, tech, business, and more — built to help you grow with confidence.",
  },
  {
    icon: <BadgeCheck className="w-10 h-10" />,
    title: "Earn Certificates That Count",
    description:
      "Complete each course and earn industry-recognized certificates — a smart way to invest in your future and show proof of your skills.",
  },
  {
    icon: <Bot className="w-10 h-10" />,
    title: "Smarter Learning with AI Support",
    description:
      "With our AI-powered assistant, you’ll never feel stuck — get instant help, stay on track, and make every minute of learning count.",
  },
];

function CareerFeatures() {
  return (
    <section className="bg-[#FDF7FD] py-16 px-4 sm:px-8 md:px-20">
      <h2 className="text-3xl md:text-4xl font-ibm font-semibold mb-15 text-center">
        Invest in Your Career from Day One
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="text-center space-y-4 px-4">
            <div className="flex justify-center">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CareerFeatures;
