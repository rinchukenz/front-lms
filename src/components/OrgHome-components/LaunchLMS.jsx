import React from "react";

function LaunchLMS() {
  return (
    <section className="px-4 py-16 sm:px-8 md:px-15 lg:px-24 bg-white space-y-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-ibm font-semibold mb-10 text-gray-900">
        Launch Your Organization LMS in Days-Not Months
      </h2>

      <p className="text-base md:text-lg font-inter text-gray-700 max-w-2xl">
        Get a fully branded, cloud-based LMS with zero tech effort. We handle
        setup, onboarding, and support so you can focus on delivering great
        education.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
        <button className="px-6 py-3 font-inter rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition">
          Book a free Demo
        </button>
        <button className="px-6 py-3 font-inter rounded-full border border-gray-300 text-black font-semibold hover:bg-gray-100 transition">
          Get Product Brochure
        </button>
        <button className="px-6 py-3 font-inter rounded-full border border-gray-300 text-black font-semibold hover:bg-gray-100 transition">
          Register Organization
        </button>
      </div>
    </section>
  );
}

export default LaunchLMS;
