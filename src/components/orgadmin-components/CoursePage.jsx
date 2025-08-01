import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCourse, getCourseById } from "../../services/OrgAdminService";
import { toast } from "react-toastify";
import CourseFaqs from "./CourseFaqs";
import CourseReviews from "./CourseReviews";
import CourseOutcomes from "./CourseOutcomes";
import CourseInstructors from "./CourseInstructors";
import CourseCertificate from "./CourseCertificate";
import CourseTags from "./CourseTags";
import CourseDetails from "./CourseDetails";

function CoursePage() {
  const navigate = useNavigate();
  const { cId } = useParams();
  const [course, setCourse] = useState(null);

  const fetchCourse = async () => {
    try {
      const response = await getCourseById(cId);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCourse(cId);
      toast.success("Course deleted successfully");
      navigate("/orgadmin/courses");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete course");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [cId]);

  if (!course) {
    return <div className="text-center mt-10">Loading course...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg mt-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/orgadmin/update-course/${cId}`)}
            className="hover:bg-violet-600 hover:text-white text-xs font-bold cursor-pointer text-black px-6 py-2 rounded-md border border-[#A2A2A2] shadow transition"
          >
            Update Course
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold cursor-pointer px-6 py-2 rounded-md border shadow transition"
          >
            Delete Course
          </button>
        </div>

        <button
          onClick={() => navigate(`/orgadmin/courses/${cId}/syllabus`)}
          className="bg-violet-500 hover:bg-violet-600 hover:text-white text-xs font-bold cursor-pointer text-white px-6 py-2 rounded-md border shadow transition"
        >
          View/Manage Course Syllabus
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {course.title}
          </h1>
          <p className="text-lg text-gray-700 mt-1">{course.subtitle}</p>
        </div>
      </div>

      {/* Thumbnail */}
      {course.thumbnailUrl && (
        <div className="mb-10">
          <img
            src={course.thumbnailUrl}
            alt="Course Thumbnail"
            className="w-full lg:w-[50%] max-h-[400px] object-cover rounded-md"
          />
        </div>
      )}

      {/* Description */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Course Description
        </h2>
        <p className="text-gray-700 leading-relaxed text-base">
          {course.description}
        </p>
      </div>

      {/* Instructors Section */}
      <CourseInstructors />

      {/* Tags */}
      <CourseTags course={course} />

      {/* Details */}
      <CourseDetails course={course} />

      {/* Certificate Sample Modal Trigger */}
      <CourseCertificate course={course} />

      {/* FAQs Section */}
      <CourseFaqs />

      {/* Reviews Section */}
      <CourseReviews />

      {/* Course Outcomes Section */}
      <CourseOutcomes />
    </div>
  );
}

export default CoursePage;
