import React, { useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import courseImg from "../../assets/python.jpeg"; 
import aws from "../../assets/AWS.jpg"; 
import sb from "../../assets/SB.jpg"; 
import py from "../../assets/PY.jpg"; 
import ml from "../../assets/ML.jpg"; 
import da from "../../assets/DA.jpg";
import pb from "../../assets/PB.jpeg";
import java from "../../assets/JAVA.jpeg";

const courses = [
  {
    id: 1,
    image: ml,
    title: "Machine Learning",
    subtitle: "Recorded Course",
  },
  {
    id: 2,
    image: aws,
    title: "Amazon Web Services (AWS)",
    subtitle: "Recorded Course",
  },
  {
    id: 3,
    image: py,
    title: "Python Test Practices",
    subtitle: "Recorded Course",
  },
  {
    id: 4,
    image: da,
    title: "Data Analytics",
    subtitle: "Recorded Course",
  },
  {
    id: 5,
    image: py,
    title: "Python Test Practices - II",
    subtitle: "Recorded Course",
  },
  {
    id: 6,
    image: java,
    title: "Java Full Stack Development",
    subtitle: "Recorded Course",
  },
  {
    id: 7,
    image: py,
    title: "Python Test Practices - III",
    subtitle: "Recorded Course",
  },
  {
    id: 8,
    image: sb,
    title: "Spring Boot",
    subtitle: "Recorded Course", 
  },
  {
    id: 9,
    image: pb,
    title: "Power BI",
    subtitle: "Recorded Course",
  },
];


function Courses() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-gray-600 mb-6 mt-4">
        Quick look at everything going around within your courses
      </h2>
      <div className="flex gap-4 mb-6 text-white">
        <button className="border px-2 py-1 bg-violet-500 rounded-md">
          New Recorded course
        </button>
        <button className="border px-2 py-1 bg-violet-500 rounded-md">
          New Cohort-Based Course (CBC)
        </button>
      </div>
      <div className="my-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No courses found.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              image={course.image}
              title={course.title}
              subtitle={course.subtitle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
