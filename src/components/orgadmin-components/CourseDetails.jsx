import React from "react";

function CourseDetails({course}) {
  const handleTogglePublish = async () => {
    try {
      if (course.isPublished) {
        await unpublishCourse(cId);
        toast.success("Course Unpublished");
      } else {
        await publishCourse(cId);
        toast.success("Course Published");
      }
      fetchCourse();
    } catch (error) {
      toast.error("Failed to toggle publish state");
      console.error("Publish toggle error:", error);
    }
  };

  return (
    <div className="mb-12 border-t border-[#A2A2A2] pt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-sm">
        <div className="p-4 rounded-lg border">
          <span className="block font-semibold text-gray-800">Language:</span>
          <span className="mt-1 block text-gray-600">{course.language}</span>
        </div>
        <div className="p-4 rounded-lg border">
          <span className="block font-semibold text-gray-800">Category:</span>
          <span className="mt-1 block text-gray-600">{course.category}</span>
        </div>
        <div className="p-4 rounded-lg border">
          <span className="block font-semibold text-gray-800">Visibility:</span>
          <span className="mt-1 block text-gray-600">{course.visibility}</span>
        </div>
        <div className="p-4 rounded-lg border">
          <span className="block font-semibold text-gray-800">Free/Paid:</span>
          <span className="mt-1 block text-gray-600">
            {course.isFree ? "Free" : "Paid"}
          </span>
        </div>
        <div className="p-4 rounded-lg border">
          <div className="flex justify-between items-center">
            <span className="block font-semibold text-gray-800">
              Published:
            </span>
            <div className="relative group inline-block">
              <button
                onClick={handleTogglePublish}
                className={`text-xs px-3 py-1 rounded-2xl cursor-pointer font-medium transition
                  ${
                    course.isPublished
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }
                  `}
              >
                {course.isPublished ? "Unpublish" : "Publish"}
              </button>

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap z-10">
                {course.isPublished
                  ? "Click to unpublish this course"
                  : "Click to publish this course"}
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-gray-600">
              {course.isPublished ? "Yes" : "No"}
            </span>
          </div>
        </div>
        <div className="p-4 rounded-lg border">
          <span className="block font-semibold text-gray-800">Created By:</span>
          <span className="mt-1 block text-gray-600">
            {course.createdByAdminId}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
