import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Q1: Can we use our own domain?",
    answer:
      "Yes, your LMS will run on your custom domain (e.g., organization.highrr.com), with your logo and colors.",
  },
  {
    question: "Q2: How long does setup take?",
    answer:
      "Yes, you can fully brand your LMS with your organization’s logo, colors, and custom domain.",
  },
  {
    question: "Q3: Do we need technical staff to manage it?",
    answer:
      "No technical knowledge is required. Our team manages everything from setup to support.",
  },
];

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="px-4 py-8 sm:px-8 md:px-16 lg:px-24 bg-white">
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
              className="w-full text-left px-6 py-4 transition flex justify-between items-center"
            >
              <span className="text-base font-inter text-gray-900">
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
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-6 py-4 text-gray-700 text-sm"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
