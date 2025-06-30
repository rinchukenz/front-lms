import React from "react";
import graph from "../../assets/graph.png";
import ProgressCard from "../ProgressCard/ProgressCard";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";

function ProgressTracking() {


  return (
    <div className="mx-3 md:mr-10">
      <div className="w-full md:w-[95%] mx-auto my-4 px-3 py-3 relative border-[#D9D9D9] border rounded-lg bg-white">
        <h2 className="text-lg md:text-xl">Your Overall Learning Progress,</h2>
        <div className="middle-container flex mt-4 gap-6 ">
          <div className="left flex flex-1/3 py-4 md:py-10 md:justify-center">
            <CircularProgressBar percentage={65} />
          </div>
          <div className="right flex-2/3">
            <h3 className="mb-2 text-lg md:text-xl md:mb-4">Recent Courses:</h3>
            <ProgressCard progress={50} course={"React Native Basics"} />
            <ProgressCard progress={80} course={"Python Introduction"} />
            <ProgressCard progress={65} course={"Springboot microservices"}/>
          </div>
        </div>
        <div className="go-to flex justify-end mt-2">
            <button className="border border-gray-400 rounded-2xl text-xs md:text-sm px-8 py-1 cursor-pointer">Go to My Learning</button>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracking;
