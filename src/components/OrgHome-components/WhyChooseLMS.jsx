import React from "react";
import { FileText, Bot, QrCode, BarChart } from "lucide-react"; // you can use your own icons too

const features = [
  {
    title: "AI Interview Preparation",
    description:
      "Simulate job interviews with AI-driven questions and instant feedback for placement readiness.",
    icon: <FileText className="w-8 h-8 text-black" />,
  },
  {
    title: "AI-Proctored Exams",
    description:
      "Conduct secure online exams using facial recognition, screen tracking, and anti-cheating algorithms.",
    icon: <Bot className="w-8 h-8 text-black" />,
  },
  {
    title: "AI-Evaluated Submissions",
    description:
      "Automatically grade assignments, code, and written answers using intelligent evaluation models.",
    icon: <QrCode className="w-8 h-8 text-black" />,
  },
  {
    title: "Smart Student Analytics",
    description:
      "Track engagement, predict dropouts, and identify learning gaps through AI-powered insights.",
    icon: <BarChart className="w-8 h-8 text-black" />,
  },
];

function WhyChooseLMS() {
  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 px-6 sm:px-10 md:px-15 lg:px-24 bg-white">
      <h2 className="text-3xl md:text-4xl font-ibm font-semibold mb-10 md:mb-15 lg:mb-20">
        Why Choose Our LMS?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-4 border-purple-400 flex items-center justify-center">
                {React.cloneElement(feature.icon, {
                  className:
                    "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-black",
                })}
              </div>
            </div>
            <h3 className="font-ibm font-semibold text-lg md:text-2xl mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 font-inter text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseLMS;
