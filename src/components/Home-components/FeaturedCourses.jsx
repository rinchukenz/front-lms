import React from "react";
import left from "../../assets/leftArrow.svg";
import right from "../../assets/rightArrow.svg";
import cource1 from "../../assets/thumbnail_software 1.png";
import star from "../../assets/star 10.svg";
import cource2 from "../../assets/flutter.png";
import cource3 from "../../assets/C++.png";
import cource4 from "../../assets/WEB 1.png";
import cource5 from "../../assets/C Programming.png";
const FeaturedCourses = () => {
  const softwareD = [
    {
      img: cource1,
      cource: "The Complete Full-Stack Web Devleopment Bootcamp",
      tutor: "Sophia Davis",
      clogo: "",
      company: "SeaCoding",
      rating: "5.0",
      stars: star,
      price: "₹3,779",
    },
    {
      img: cource2,
      cource: "The Complete Full-Stack Web Devleopment Bootcamp",
      tutor: "Sophia Davis",
      clogo: "",
      company: "SeaCoding",
      rating: "5.0",
      stars: star,
      price: "₹3,779",
    },
    {
      img: cource3,
      cource: "The Complete Full-Stack Web Devleopment Bootcamp",
      tutor: "Sophia Davis",
      clogo: "",
      company: "SeaCoding",
      rating: "5.0",
      stars: star,
      price: "₹3,779",
    },
    {
      img: cource4,
      cource: "The Complete Full-Stack Web Devleopment Bootcamp",
      tutor: "Sophia Davis",
      clogo: "",
      company: "SeaCoding",
      rating: "5.0",
      stars: star,
      price: "₹3,779",
    },
    {
      img: cource5,
      cource: "The Complete Full-Stack Web Devleopment Bootcamp",
      tutor: "Sophia Davis",
      clogo: "",
      company: "SeaCoding",
      rating: "5.0",
      stars: star,
      price: "₹3,779",
    },
  ];
  return (
    <section className="bg-gradient-to-b from-[#FCECFF] via-white to-white px-6 lg:px-20 py-10 lg:py-4 mb-15">
      <h1 className="text-3xl md:text-4xl font-ibm font-semibold mb-5">Featured Courses</h1>
      <p className="text-[#414141] mb-10 text-sm md:text-lg lg:text-xl">
        Handpicked from our partner organizations, this featured course brings
        you real-world skills taught by industry experts.
      </p>
      <div className="flex justify-between font-bold text-[#414141] text-md">
        <span className="text-[#9D5CFF]">Software Development</span>
        <span className="hover:cursor-pointer">
          Business & Entrepreneurship
        </span>
        <span className="hover:cursor-pointer">Creative & Design</span>
        <span className="hover:cursor-pointer">Data & Analytics</span>
        <span className="hover:cursor-pointer">
          Personal Growth & Productivity
        </span>
      </div>
      <hr className="bg-[#636363] h-[1px] mt-3" />
      <div className="flex justify-between mt-5">
        <div className="content-center mr-5">
          <img src={left} alt="" />
        </div>

        <div className="w-[95%] flex  justify-between">
          {softwareD.map((item) => (
            <div className="w-[170px] h-[273px] border-[1px] p-[2px] rounded-lg border-[#ABABAB] hover:cursor-pointer">
              <img src={item.img} alt="cource" className="mt-[3px] mb-[3px]" />
              <p className="text-xs font-bold mt-[3px] mb-[3px]">
                {item.cource}
              </p>
              <p className="text-xs mt-[3px] mb-[3px]">{item.tutor}</p>
              <div className="mt-[3px] mb-[3px]">
                <span className="text-[10px] inline-block h-[30px] w-[30px] rounded-full bg-[#D9D9D9] text-center content-center">
                  Logo
                </span>{" "}
                <span className="text-sm">{item.company}</span>
              </div>

              <div className="flex item-center mt-[3px] mb-[3px]">
                <div className="text-xs mr-2 text-[#C76911] font-bold content-center">
                  {item.rating}
                </div>
                <div className="flex items-center">
                  <img className="w-[10px] mr-[4px]" src={star} alt="start" />
                  <img className="w-[10px] mr-[4px]" src={star} alt="start" />
                  <img className="w-[10px] mr-[4px]" src={star} alt="start" />
                  <img className="w-[10px] mr-[4px]" src={star} alt="start" />
                  <img className="w-[10px] mr-[4px]" src={star} alt="start" />
                </div>
              </div>
              <p className="mt-[5px] mb-[5px] font-bold">{item.price}</p>
            </div>
          ))}
        </div>
        <div className="content-center ml-5">
          <img src={right} alt="" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
