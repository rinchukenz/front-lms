import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

import bg1 from "../../assets/ai-image4.jpg";
import bg2 from "../../assets/ai-image1.jpg";
import bg3 from "../../assets/homebg.jpg";

const images = [bg1, bg2, bg3];
const infoCards = [
  {
    heading: "Track, manage, grow all from one place.",
    paragraph:
      "Our LMS dashboard helps you monitor student progress across courses in real-time, manage users, content, and assignments with ease, and generate detailed analytics.",
  },
  {
    heading: "Deliver personalized experiences using AI.",
    paragraph:
      "Use AI-driven recommendations to tailor content for each student. Empower learners with custom paths, quizzes, and instant feedback that adapts as they grow.",
  },
  {
    heading: "Automate from enrollments using AI.",
    paragraph:
      "Free up your admin time by automating repetitive tasks. Set workflows for enrollments, certification, reminders, and performance tracking with zero manual effort.",
  },
];

function ImageCarouselSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="md:pl-[20%] mx-auto relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="rounded-lg  shadow-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full md:h-94 lg:h-64 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Card (static position and style) */}
      <div
        className="
        mt-6 md:mt-0 px-4 py-3 md:space-y-4 lg:space-y-2 bg-white rounded-lg shadow-lg w-full sm:w-[90%] mx-auto
        md:absolute  md:transform md:-translate-x-1/2 md:left-1/4 md:top-[-35px]
        lg:left-[20%] lg:top-[-25px] lg:w-[40%] md:w-[40%] md:z-10
        "
      >
        <AnimatePresence mode="wait">
          <motion.h3
            key={`heading-${activeIndex}`}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-semibold font-ibm text-gray-900 mb-2 text-sm sm:text-base lg:text-xs leading-snug"
          >
            {infoCards[activeIndex]?.heading}
          </motion.h3>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`para-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-600 font-inter text-xs sm:text-sm lg:text-xxxs mb-2 leading-snug"
          >
            {infoCards[activeIndex]?.paragraph}
          </motion.p>
        </AnimatePresence>

        <button className="bg-[#9D5CFF] hover:bg-purple-700 font-inter text-white lg:text-xxs px-6 py-1 rounded-md">
          View Plan
        </button>
      </div>
    </div>
  );
}

export default ImageCarouselSwiper;
