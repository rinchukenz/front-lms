import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Q1: What kind of courses are available on this platform?",
    answer:
      "We offer handpicked, industry-relevant courses created and uploaded by our own team of experts. Topics include AI, business, technology, and career development — all designed to help you become job-ready.",
  },
  {
    question: "Q2: Can I upload my own courses or content?",
    answer:
      "Yes, you can fully brand your LMS with your organization’s logo, colors, and custom domain.",
  },
  {
    question: "Q3: Is the course content the same for all users globally?",
    answer:
      "No technical knowledge is required. Our team manages everything from setup to support.",
  },
  {
    question: "Q4: Are the courses beginner-friendly?",
    answer:
      "No technical knowledge is required. Our team manages everything from setup to support.",
  },
  {
    question: "Q5: Will I get a certificate after completing a course?",
    answer:
      "No technical knowledge is required. Our team manages everything from setup to support.",
  },
];

function HomeFaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="px-4 py-8 sm:px-8 md:px-16 lg:px-20 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-ibm font-semibold mb-12 text-gray-900">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl space-y-2">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            layout
            initial={{ borderRadius: 8 }}
            className="border border-[#ABABAB] rounded-lg bg-white overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-2 transition flex justify-between items-center"
            >
              <span className="text-base font-inter font-medium text-gray-900">
                {faq.question}
              </span>
              <span className="text-xl text-gray-600">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-6 text-sm font-normal overflow-hidden"
                >
                  <div className="py-2">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HomeFaqSection;
