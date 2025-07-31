import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "The automated mock interviews and coding labs have been a game changer. Our students are more confident, engaged, and industry-ready. Branding it under our name made it feel truly ours — parents and students trust us more than ever.",
    name: "David John, Founder",
    role: "ABC Training Institute",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    quote:
      "This platform helped our teachers deliver more personalized learning. The AI-powered labs are intuitive and effective.",
    name: "Sara Lee, Director",
    role: "Bright Minds Academy",
    image: "https://i.pravatar.cc/100?img=10",
  },
  {
    quote:
      "Students are loving the interactive assessments. It gives them a real-world feel even before they graduate.",
    name: "Michael Chan, Principal",
    role: "NextGen High School",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    quote:
      "Highrr has streamlined our exam process while keeping integrity at the core. The AI proctoring is top-notch!",
    name: "Priya Nair, Academic Dean",
    role: "FutureSkills University",
    image: "https://i.pravatar.cc/100?img=16",
  },
  {
    quote:
      "The seamless integration of learning content and coding labs has significantly improved student retention in our programs.",
    name: "Arjun Patel, Program Coordinator",
    role: "CodeCraft Institute",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    quote:
      "With Highrr, we’ve finally been able to give our remote learners a truly engaging, interactive classroom experience.",
    name: "David Gomez, Head of eLearning",
    role: "Open Horizons College",
    image: "https://i.pravatar.cc/100?img=17",
  },
  {
    quote:
      "The platform’s analytics help us track each student’s progress closely and intervene just at the right time.",
    name: "Rahul Mehta, Administrator",
    role: "SkillBridge Academy",
    image: "https://i.pravatar.cc/100?img=7",
  },
  {
    quote:
      "We saw a 30% improvement in placement rates after integrating Highrr’s AI interview prep tools.",
    name: "Emily Chen, Career Coach",
    role: "LaunchPad Learning",
    image: "https://i.pravatar.cc/100?img=8",
  },
];

function EducatorsSaying() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[index];


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % testimonials.length);
  //   }, 7000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <section className="bg-white py-14 px-6 md:px-15 lg:px-24 relative">
      <h2 className="text-3xl md:text-4xl font-ibm font-semibold mb-5 text-gray-900">
        From the Highrr Community
      </h2>

      <p className="mb-15 text-sm md:text-lg lg:text-xl">
        ❤️Trusted by thousands — see what learners and organizations have to say
        about their Highrr experience.
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

export default EducatorsSaying;
