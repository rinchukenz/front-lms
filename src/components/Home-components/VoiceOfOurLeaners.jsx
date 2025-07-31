import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Testimonials Data
const testimonials = [
  {
    quote:
      "The AI-powered mock interviews and coding labs helped me overcome my fear of real interviews. I now feel way more confident and prepared. Practicing every day with instant feedback made a huge difference in how I approach problem-solving.",
    name: "Priya Sharma, Final Year Student",
    role: "ABC Institute of Technology",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    quote:
      "This platform helped our teachers deliver more personalized learning. The AI-powered labs are intuitive and effective.",
    name: "Sara Lee, Director",
    role: "Bright Minds Academy",
    image: "https://i.pravatar.cc/100?img=7",
  },
  {
    quote:
      "Students are loving the interactive assessments. It gives them a real-world feel even before they graduate.",
    name: "Michael Chan, Principal",
    role: "NextGen High School",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    quote:
      "As a placement coordinator, I’ve seen a noticeable increase in student confidence and clarity after using Highrr's interview simulator.",
    name: "Rakesh Menon, Placement Officer",
    role: "VIT Chennai",
    image: "https://i.pravatar.cc/100?img=7",
  },
  {
    quote:
      "The seamless coding environment is perfect for live problem-solving sessions during our classes. It saves so much setup time.",
    name: "Neha Gupta, Instructor",
    role: "CodeRise Academy",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    quote:
      "I loved how easy it was to record and submit my answers. The AI feedback felt like a real mentor guiding me.",
    name: "Aman Raj, Computer Science Student",
    role: "KIIT University",
    image: "https://i.pravatar.cc/100?img=8",
  },
  {
    quote:
      "The built-in analytics tools have helped us identify at-risk students and offer timely support.",
    name: "Janet Moore, Academic Advisor",
    role: "Riverdale College",
    image: "https://i.pravatar.cc/100?img=17",
  },
  {
    quote:
      "Our students are completing more mock tests than ever before, and they genuinely enjoy the process!",
    name: "Farhan Ali, HOD - CS",
    role: "TechBridge Institute",
    image: "https://i.pravatar.cc/100?img=8",
  },
];

function VoiceOfOurLeaners() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[index];

  return (
    <section className="bg-white py-14 px-6 md:px-20 relative">
      <h2 className="text-3xl md:text-4xl font-ibm font-semibold mb-5">
        Voices of Our Learners
      </h2>

      <p className="mb-15 text-sm md:text-lg lg:text-xl">
        🎓 Real stories from students who leveled up with Highrr — confidence,
        skills, and success, all in one platform.
      </p>

      <div className="relative min-h-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col mx-auto items-center"
          >
            <blockquote className="text-lg px-2 text-center md:text-2xl text-black font-inter leading-relaxed max-w-3xl mb-10">
              “{testimonial.quote}”
            </blockquote>

            <div className="w-16 h-16 rounded-full border-2 border-purple-500 p-0.5">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <p className="text-md md:text-lg font-semibold mt-3 text-black">
              {testimonial.name}
            </p>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
          </motion.div>
        </AnimatePresence>
        {/* Navigation */}
        <button
          onClick={prev}
          className="absolute left-0 top-[50%] w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
        >
          ❮
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-[50%] w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800"
        >
          ❯
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === index ? "bg-purple-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default VoiceOfOurLeaners;
