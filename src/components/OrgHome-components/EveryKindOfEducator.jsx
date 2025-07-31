import React from "react";
import college from "../../assets/college.jpg";
import edu4 from "../../assets/edu4.jpg";
import edu2 from "../../assets/edu2.jpg";
import edu3 from "../../assets/edu3.jpg";

function EveryKindOfEducator() {
  const features = [
    {
      title: "College & Universitites",
      image: college,
    },
    {
      title: "Skill Training Centers",
      image: edu2,
    },
    {
      title: "EdTech Startups",
      image: edu3,
    },
    {
      title: "Corporate Training",
      image: edu4,
    },
  ];

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-10 px-6 sm:px-10 md:px-15 lg:px-24 bg-white">
      <h2 className="text-3xl md:text-4xl font-ibm font-semibold mb-10 md:mb-15 lg:mb-15">
        Perfect for Every Kind of Educator{" "}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border rounded-lg p-0.5 text-center shadow-sm hover:shadow-md transition duration-300"
          >
            <img src={feature.image} alt="" className="w-full h-auto rounded-lg" />
            <h3 className="font-ibm text-lg md:text-lg mx-2 my-5">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EveryKindOfEducator;
