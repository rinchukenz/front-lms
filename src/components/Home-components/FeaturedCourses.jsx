import React, { useRef, useState } from "react";
import left from "../../assets/leftArrow.svg";
import right from "../../assets/rightArrow.svg";
import cource1 from "../../assets/thumbnail_software 1.png";
import star from "../../assets/star 10.svg";
import cource2 from "../../assets/flutter.png";
import cource3 from "../../assets/C++.png";
import cource4 from "../../assets/WEB 1.png";
import cource5 from "../../assets/C Programming.png";

const FeaturedCourses = () => {
  const scrollRef = useRef(null);

  // State to keep track of selected category
  const [selectedCategory, setSelectedCategory] = useState(
    "Software Development"
  );

  const categories = [
    "Software Development",
    "Business & Entrepreneurship",
    "Creative & Design",
    "Data & Analytics",
    "Personal Growth",
  ];

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left")
      current.scrollBy({ left: -300, behavior: "smooth" });
    else current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const softwareD = [
    {
      img: cource1,
      cource: "The Complete Full-Stack Web Devleopment Bootcamp",
      tutor: "Sophia Davis",
      company: "SeaCoding",
      rating: "5.0",
      price: "₹3,779",
    },
    {
      img: cource2,
      cource: "Flutter Development Masterclass",
      tutor: "Liam Smith",
      company: "DevAcademy",
      rating: "4.8",
      price: "₹2,999",
    },
    {
      img: cource3,
      cource: "Master C++ Programming from Scratch",
      tutor: "Olivia Johnson",
      company: "CodeLab",
      rating: "4.9",
      price: "₹1,499",
    },
    {
      img: cource4,
      cource: "Responsive Web Design with HTML/CSS",
      tutor: "Noah Wilson",
      company: "WebXpert",
      rating: "4.7",
      price: "₹1,999",
    },
    {
      img: cource5,
      cource: "C Programming for Beginners",
      tutor: "Emma Brown",
      company: "CodeCraft",
      rating: "4.6",
      price: "₹999",
    },
    {
      img: cource1,
      cource: "The Complete Full-Stack Web Devleopment Bootcamp",
      tutor: "Sophia Davis",
      company: "SeaCoding",
      rating: "5.0",
      price: "₹3,779",
    },
    {
      img: cource2,
      cource: "Flutter Development Masterclass",
      tutor: "Liam Smith",
      company: "DevAcademy",
      rating: "4.8",
      price: "₹2,999",
    },
    {
      img: cource3,
      cource: "Master C++ Programming from Scratch",
      tutor: "Olivia Johnson",
      company: "CodeLab",
      rating: "4.9",
      price: "₹1,499",
    },
    {
      img: cource4,
      cource: "Responsive Web Design with HTML/CSS",
      tutor: "Noah Wilson",
      company: "WebXpert",
      rating: "4.7",
      price: "₹1,999",
    },
    {
      img: cource5,
      cource: "C Programming for Beginners",
      tutor: "Emma Brown",
      company: "CodeCraft",
      rating: "4.6",
      price: "₹999",
    },
    {
      img: cource1,
      cource: "The Complete Full-Stack Web Devleopment Bootcamp",
      tutor: "Sophia Davis",
      company: "SeaCoding",
      rating: "5.0",
      price: "₹3,779",
    },
    {
      img: cource2,
      cource: "Flutter Development Masterclass",
      tutor: "Liam Smith",
      company: "DevAcademy",
      rating: "4.8",
      price: "₹2,999",
    },
    {
      img: cource3,
      cource: "Master C++ Programming from Scratch",
      tutor: "Olivia Johnson",
      company: "CodeLab",
      rating: "4.9",
      price: "₹1,499",
    },
    {
      img: cource4,
      cource: "Responsive Web Design with HTML/CSS",
      tutor: "Noah Wilson",
      company: "WebXpert",
      rating: "4.7",
      price: "₹1,999",
    },
    {
      img: cource5,
      cource: "C Programming for Beginners",
      tutor: "Emma Brown",
      company: "CodeCraft",
      rating: "4.6",
      price: "₹999",
    },
    // ... (repeat items if needed)
  ];

  return (
    <section className="bg-gradient-to-b from-[#FCECFF] via-white to-white px-4 sm:px-6 lg:px-20 pt-70 pb-20 md:py-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-ibm font-semibold mb-5">
        Featured Courses
      </h1>
      <p className="text-[#414141] mb-6 sm:mb-10 text-sm sm:text-base md:text-lg lg:text-xl">
        Handpicked from our partner organizations, this featured course brings
        you real-world skills taught by industry experts.
      </p>

      {/* Category Filter */}
      <div className="overflow-x-auto lg:overflow-x-hidden no-scrollbar mb-4">
        <div className="flex gap-4 font-bold text-[#414141] text-sm sm:text-md whitespace-nowrap">
          {categories.map((category) => (
            <span
              key={category}
              className={`cursor-pointer ${
                selectedCategory === category ? "text-[#9D5CFF]" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <hr className="bg-[#636363] h-[1px] mb-5" />

      {/* Carousel with Arrows */}
      <div className="relative">
        {/* Left Arrow */}
        <div
          className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 hidden lg:block cursor-pointer"
          onClick={() => handleScroll("left")}
        >
          <img src={left} alt="left arrow" />
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
        >
          {softwareD.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[180px] sm:min-w-[200px] max-w-[240px] flex-shrink-0 border border-[#ABABAB] p-3 rounded-lg bg-white hover:shadow-md"
            >
              <img
                src={item.img}
                alt="course"
                className="mb-2 rounded-md w-full h-[130px] object-cover"
              />
              <p className="text-xs font-bold mb-1 leading-snug line-clamp-2">
                {item.cource}
              </p>
              <p className="text-[10px] mb-1 text-gray-700">{item.tutor}</p>
              <div className="flex items-center mb-1 gap-1">
                <span className="text-[9px] h-6 w-6 flex items-center justify-center rounded-full bg-[#D9D9D9]">
                  Logo
                </span>
                <span className="text-[11px]">{item.company}</span>
              </div>
              <div className="flex items-center mb-1 gap-1">
                <div className="text-[11px] text-[#C76911] font-bold">
                  {item.rating}
                </div>
                <div className="flex items-center gap-[1px]">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} className="w-[9px]" src={star} alt="star" />
                  ))}
                </div>
              </div>
              <p className="font-bold mt-1 text-[12px]">{item.price}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <div
          className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 hidden lg:block cursor-pointer"
          onClick={() => handleScroll("right")}
        >
          <img src={right} alt="right arrow" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
