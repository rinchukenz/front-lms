import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../services/OrgAdminService";
import { useAuth } from "../../context/AuthContext";



function Courses() {
  const { auth } = useAuth();

  const { organizationId } = auth;

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    getAllCourses(organizationId)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(courses);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center m-2">
        <h2 className="text-gray-600 mb-6 mt-4">
          Quick look at everything going around within your courses
        </h2>

        <Link to="/orgadmin/courses/addcourse">
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold px-4 py-2 rounded-lg shadow">
            + Add Course
          </button>
        </Link>
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
              image={course.thumbnailUrl}
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
