import React from "react";
import { useNavigate } from "react-router-dom";

function AreYouAnOrganization() {

  const navigate = useNavigate();

  return (
    <section className="bg-white py-14 px-6 md:px-20">
      <div>
        <h1 className="text-3xl md:text-4xl font-ibm font-semibold mb-5">
          Are You an Organization
        </h1>
        <p className="mb-15 text-sm md:text-lg lg:text-xl font-inter text-[#414141]">
          Bring Highrr to your classrooms with your own branding, content, and
          control.
        </p>
      </div>
      <button
        onClick={() => navigate("/orghome")}
        className="bg-[#9D5CFF] text-white cursor-pointer rounded-2xl px-5 py-1"
      >
        Explore LMS for Organizations →
      </button>
    </section>
  );
}

export default AreYouAnOrganization;
