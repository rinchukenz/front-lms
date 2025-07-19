import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addInstructor,
  addOutcome,
  addReview,
  createFaq,
  deleteCourse,
  deleteFaq,
  deleteInstructor,
  deleteOutcome,
  deleteReview,
  getCourseById,
  getFaq,
  getInstructors,
  getOutcomes,
  getReviews,
  publishCourse,
  unpublishCourse,
  updateInstructor,
  updateOutcome,
  updateReview,
} from "../services/OrgAdminService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

// const outcomes = [
//   "Understand the fundamentals of JavaScript and ES6+ features",
//   "Build full-stack web apps using React and Node.js",
//   "Deploy applications on cloud platforms",
// ];

function CoursePage() {
  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({
    studentId: "",
    rating: 0,
    comment: "",
  });

  const [editReviewIndex, setEditReviewIndex] = useState(null);

  const [showAddReview, setShowAddReview] = useState(false);

  const [outcomes, setOutcomes] = useState([]);

  const [newOutcome, setNewOutcome] = useState({
    description: "",
    sequenceNumber: 0,
  });

  const [editOutcomeIndex, setEditOutcomeIndex] = useState(null);

  const [showAddOutcome, setShowAddOutcome] = useState(false);

  const [editInstructorIndex, setEditInstructorIndex] = useState(null);

  const [showAddInstructor, setShowAddInstructor] = useState(false);

  const [showAddFaq, setShowAddFaq] = useState(false);

  const [instructors, setInstructors] = useState([]);

  const [faqs, setFaqs] = useState([]);

  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  const [newInstructor, setNewInstructor] = useState({
    name: "",
    bio: "",
    profileImageUrl: "",
  });

  const [faqOpen, setFaqOpen] = useState({});

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const navigate = useNavigate();
  const { cId } = useParams();
  const [course, setCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCourse = async () => {
    try {
      const response = await getCourseById(cId);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchFaqs = async () => {
    try {
      const response = await getFaq(cId);
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await getInstructors(cId);
      setInstructors(response.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getReviews(cId);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
    }
  };

  const fetchOutcomes = async () => {
    try {
      const response = await getOutcomes(cId);
      setOutcomes(response.data);
      console.log("Outcomes fetched:", response.data);
    } catch (error) {
      console.error("Error fetching outcomes:", error);
      toast.error("Failed to fetch outcomes");
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchFaqs();
    fetchInstructors();
    fetchReviews();
    fetchOutcomes();
  }, [cId]);

  //console.log(faqs);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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

  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) {
      toast.warning("Please fill in both fields");
      return;
    }
    try {
      const res = await createFaq(cId, newFaq);
      console.log(res);
      setShowAddFaq(false);
      toast.success("FAQ added successfully");
      setNewFaq({ question: "", answer: "" });
      fetchFaqs(); // reload updated list
    } catch (error) {
      console.error("Error creating FAQ:", error);
      toast.error("Failed to create FAQ");
    }
  };

  const handleInstructorSubmit = async (e) => {
    e.preventDefault();
    if (
      !newInstructor.name ||
      !newInstructor.bio ||
      !newInstructor.profileImageUrl
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      if (editInstructorIndex !== null) {
        const instructorToUpdate = instructors[editInstructorIndex];
        const instructorId = instructorToUpdate.id;

        await updateInstructor(cId, instructorId, newInstructor);
        toast.success("Instructor updated successfully");
      } else {
        await addInstructor(cId, newInstructor);
        toast.success("Instructor added successfully");
      }

      setNewInstructor({ name: "", bio: "", profileImageUrl: "" });
      setShowAddInstructor(false);
      setEditInstructorIndex(null);
      fetchInstructors();
    } catch (error) {
      console.error("Error saving instructor:", error);
      toast.error("Failed to save instructor");
    }
  };

  const handleRemoveInstructor = async (instructorId) => {
    try {
      await deleteInstructor(cId, instructorId);
      fetchInstructors();
      toast.success("Instructor removed successfully");
    } catch (error) {
      console.error("Error removing instructor:", error);
      toast.error("Failed to remove instructor");
    }
  };

  const handleDeleteFaq = async (fId) => {
    try {
      console.log("Deleting FAQ with ID:", fId);
      await deleteFaq(cId, fId);
      toast.success("FAQ deleted");
      fetchFaqs();
    } catch (error) {
      toast.error("Failed to delete FAQ");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.studentId || !newReview.rating || !newReview.comment) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      if (editReviewIndex !== null) {
        const reviewToUpdate = reviews[editReviewIndex];
        const reviewId = reviewToUpdate.id;

        await updateReview(cId, reviewId, newReview);
        toast.success("Review updated successfully");
      } else {
        await addReview(cId, newReview);
        toast.success("Review added successfully");
      }

      setNewReview({ studentId: "", rating: 0, comment: "" });
      setShowAddReview(false);
      setEditReviewIndex(null);
      fetchReviews();
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error("Failed to save review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      // call your backend service (you must implement this)
      await deleteReview(cId, reviewId); // make sure this exists in OrgAdminService
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (error) {
      toast.error("Failed to delete review");
      console.error("Delete review error:", error);
    }
  };

  const handleOutcomeSubmit = async (e) => {
    e.preventDefault();

    if (!newOutcome.description || newOutcome.sequenceNumber <= 0) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      if (editOutcomeIndex !== null) {
        const outcomeToUpdate = outcomes[editOutcomeIndex];
        await updateOutcome(cId, outcomeToUpdate.id, newOutcome);
        toast.success("Outcome updated successfully");
      } else {
        await addOutcome(cId, newOutcome);
        toast.success("Outcome added successfully");
      }

      setNewOutcome({ description: "", sequenceNumber: 0 });
      setShowAddOutcome(false);
      setEditOutcomeIndex(null);
      fetchOutcomes();
    } catch (error) {
      console.error("Error saving outcome:", error);
      toast.error("Failed to save outcome");
    }
  };

  const handleDeleteOutcome = async (outcomeId) => {
    try {
      await deleteOutcome(outcomeId);
      toast.success("Outcome deleted successfully");
      fetchOutcomes();
    } catch (error) {
      toast.error("Failed to delete outcome");
      console.error("Delete outcome error:", error);
    }
  };

  console.log("FAQ object:", faqs);

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
      <div className="mb-12 border-t border-[#A2A2A2] pt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Instructors</h2>
          {/* Add Instructor Button */}
          {!showAddInstructor && (
            <button
              onClick={() => {
                setShowAddInstructor(true);
                setEditInstructorIndex(null);
                setNewInstructor({ name: "", bio: "", profileImageUrl: "" });
              }}
              className="bg-violet-500 hover:bg-violet-600 hover:text-white text-xs font-bold cursor-pointer text-white px-6 py-2 rounded-md border shadow transition"
            >
              Add New Instructor
            </button>
          )}
        </div>

        {/* Existing Instructors */}
        {instructors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {instructors.map((instructor, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 px-5 py-4 border border-[#8B8B8B] rounded-lg bg-white transition"
              >
                <img
                  src={instructor.profileImageUrl}
                  alt={instructor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
                <div className="flex-grow items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => {
                      setEditInstructorIndex(idx);
                      setNewInstructor(instructor);
                      setShowAddInstructor(true);
                    }}
                    className=" hover:bg-orange-400 cursor-pointer text-xs hover:text-white border border-[#8B8B8B] px-2 py-1 rounded transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleRemoveInstructor(instructor.id)}
                    className=" hover:bg-red-600 cursor-pointer text-xs hover:text-white border border-[#8B8B8B] px-2 py-1 rounded transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add / Update Instructor Form */}
        {showAddInstructor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Add New Instructor</h2>
              <form onSubmit={handleInstructorSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newInstructor.name}
                    onChange={(e) =>
                      setNewInstructor((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Instructor name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows={3}
                    value={newInstructor.bio}
                    onChange={(e) =>
                      setNewInstructor((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Short bio"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    name="profileImageUrl"
                    value={newInstructor.profileImageUrl}
                    onChange={(e) =>
                      setNewInstructor((prev) => ({
                        ...prev,
                        profileImageUrl: e.target.value,
                      }))
                    }
                    className="w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-violet-600 cursor-pointer hover:bg-violet-700 text-white px-6 py-2 rounded-md"
                  >
                    {editInstructorIndex !== null
                      ? "Update Instructor"
                      : "Add Instructor"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddInstructor(false);
                      setEditInstructorIndex(null);
                      setNewInstructor({
                        name: "",
                        bio: "",
                        profileImageUrl: "",
                      });
                    }}
                    className=" hover:bg-gray-100 cursor-pointer px-6 py-2 border rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      {course.tags?.length > 0 && (
        <div className="mb-12 border-t border-[#A2A2A2] pt-10">
          <h2 className="text-2xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-3">
            {course.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-4 py-1.5 rounded-full cursor-pointer font-bold border border-[#A1A1A1] transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Details */}
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
            <span className="block font-semibold text-gray-800">
              Visibility:
            </span>
            <span className="mt-1 block text-gray-600">
              {course.visibility}
            </span>
          </div>
          <div className="p-4 rounded-lg border">
            <span className="block font-semibold text-gray-800">
              Free/Paid:
            </span>
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
            <span className="block font-semibold text-gray-800">
              Created By:
            </span>
            <span className="mt-1 block text-gray-600">
              {course.createdByAdminId}
            </span>
          </div>
        </div>
      </div>

      {/* Certificate Sample Modal Trigger */}
      {course.certificateSampleUrl && (
        <div className="mb-6 flex justify-center">
          <button
            onClick={openModal}
            className="text-blue-400 underline hover:text-blue-600 text-lg cursor-pointer"
          >
            View Sample Certificate
          </button>
        </div>
      )}

      {/* Certificate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative flex justify-center items-center w-[90vw] h-[90vh] bg-white rounded-md shadow-xl overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute cursor-pointer top-3 right-4 text-3xl font-bold text-gray-700 hover:text-black z-10"
            >
              &times;
            </button>
            <img
              src={course.certificateSampleUrl}
              title="Certificate Sample"
              className="w-2/3 h-2/3 border-none"
            />
            {/* <iframe
              src={course.certificateSampleUrl}
              title="Certificate Sample"
              className="w-full h-full border-none"
            ></iframe> */}
          </div>
        </div>
      )}

      {/* FAQs Section */}
      <div className="mb-12 border-t border-[#A2A2A2] pt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Frequently Asked Questions
          </h2>
          {!showAddFaq && (
            <button
              onClick={() => {
                setShowAddFaq(true);
                //setEditInstructorIndex(null);
                setNewFaq({ question: "", answer: "" });
              }}
              className="bg-violet-500 hover:bg-violet-600 hover:text-white text-xs font-bold cursor-pointer text-white px-6 py-2 rounded-md border shadow transition"
            >
              Add New FAQ
            </button>
          )}
        </div>

        {faqs.length > 0 && (
          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#8B8B8B] rounded-xl overflow-hidden bg-white transition-all duration-300"
              >
                {/* FAQ Header */}
                <div className="w-full flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                  <span
                    className="text-gray-900 font-medium text-base text-left flex-1"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                  </span>

                  <div className="flex items-center gap-3">
                    {/* Delete with tooltip (optional) */}
                    <div className="relative group inline-block">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFaq(faq.id);
                        }}
                        className="text-red-600 cursor-pointer text-sm font-medium hover:underline transition"
                      >
                        Delete
                      </button>
                      <div className="absolute -top-0 -left-15 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all bg-black text-white text-xs px-3 py-1 rounded-md whitespace-nowrap z-10">
                        Delete this FAQ
                      </div>
                    </div>

                    {/* Toggle Icon */}
                    <svg
                      onClick={() => toggleFaq(index)}
                      className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 cursor-pointer ${
                        faqOpen[index] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* FAQ Answer */}
                {faqOpen[index] && (
                  <div className="px-6 py-4 bg-white border-t text-gray-700 transition-all duration-300 ease-in-out">
                    <p className="text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add / Update FAQ Form */}
        {showAddFaq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">
                Add a New FAQ
              </h2>
              <form
                onSubmit={handleFaqSubmit}
                className="space-y-6 max-w-2xl bg-white p-6 rounded-xl shadow-md"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={newFaq.question}
                    onChange={(e) =>
                      setNewFaq((prev) => ({
                        ...prev,
                        question: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the question"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Answer
                  </label>
                  <textarea
                    rows={4}
                    value={newFaq.answer}
                    onChange={(e) =>
                      setNewFaq((prev) => ({ ...prev, answer: e.target.value }))
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the answer"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition"
                  >
                    Add FAQ
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddFaq(false);
                      //setEditInstructorIndex(null);
                      setNewFaq({ question: "", answer: "" });
                    }}
                    className=" hover:bg-gray-100 cursor-pointer px-6 py-2 border rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t border-[#A2A2A2] pt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
          {/* Button for Add Review */}
          {!showAddReview && (
            <div className="max-w-3xl text-left">
              <button
                onClick={() => {
                  setShowAddReview(true);
                  setEditReviewIndex(null);
                  setNewReview({ studentId: "", rating: 0, comment: "" });
                }}
                className="bg-violet-500 hover:bg-violet-600 hover:text-white text-xs font-bold cursor-pointer text-white px-6 py-2 rounded-md border shadow transition"
              >
                Add New Review
              </button>
            </div>
          )}
        </div>

        {/* Existing Reviews */}
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-5 border border-[#A2A2A2] rounded-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {review.studentId}
                    </h3>
                    <div className="flex items-center space-x-1 text-yellow-500 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-5 h-5 ${
                            i < review.rating ? "fill-current" : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.946c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.782.57-1.837-.197-1.538-1.118l1.287-3.946a1 1 0 00-.364-1.118L2.075 9.373c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-semibold">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.comment}
                </p>
                <div className="flex justify-end gap-3 mt-3">
                  {/* <button
                    onClick={() => {
                      setEditReviewIndex(
                        reviews.findIndex((r) => r.id === review.id)
                      );
                      setNewReview({
                        studentId: review.studentId,
                        rating: review.rating,
                        comment: review.comment,
                      });
                      setShowAddReview(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-1.5 rounded transition"
                  >
                    Update
                  </button> */}
                  <div className="relative group inline-block">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteReview(review.id);
                      }}
                      className="text-red-600 cursor-pointer text-sm font-medium hover:underline transition"
                    >
                      Delete
                    </button>
                    <div className="absolute -top-0 -left-15 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all bg-black text-white text-xs px-3 py-1 rounded-md whitespace-nowrap z-10">
                      Delete this FAQ
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add / Update Review Form */}
        {showAddReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">
                Add a New FAQ
              </h2>
              <form
                onSubmit={handleReviewSubmit}
                className="space-y-6 max-w-2xl mt-10 bg-white p-6 rounded-xl shadow-md"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={newReview.studentId}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        studentId: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Student name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <select
                    name="rating"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        rating: parseInt(e.target.value, 10),
                      }))
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Select Rating
                    </option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your review here"
                    required
                  />
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition"
                  >
                    {editReviewIndex !== null ? "Update Review" : "Add Review"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddReview(false);
                      setEditReviewIndex(null);
                      setNewReview({ studentId: "", rating: 0, comment: "" });
                    }}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Course Outcomes Section */}
      <div className="mt-16 border-t border-[#A2A2A2] pt-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Course Outcomes
          </h2>
          {!showAddOutcome && (
            <button
              onClick={() => {
                // Only generate sequence number when adding, not editing
                let nextSeq = 1;
                if (outcomes && outcomes.length > 0) {
                  const existingNumbers = outcomes
                    .map((o) => o.sequenceNumber)
                    .sort((a, b) => a - b);
                  for (let i = 0; i < existingNumbers.length; i++) {
                    if (existingNumbers[i] !== i + 1) {
                      nextSeq = i + 1;
                      break;
                    }
                    nextSeq = existingNumbers.length + 1;
                  }
                }

                setShowAddOutcome(true);
                setEditOutcomeIndex(null); // clear edit mode
                setNewOutcome({
                  description: "",
                  sequenceNumber: nextSeq, // only for adding
                });
              }}
              className="bg-violet-500 hover:bg-violet-600 hover:text-white text-xs font-bold cursor-pointer text-white px-6 py-2 rounded-md border shadow transition"
            >
              Add New Outcome
            </button>
          )}
        </div>

        {/* Existing Outcomes */}
        <div className="bg-white rounded-xl border border-[#A2A2A2] p-6 mt-6">
          {outcomes && outcomes.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {[...outcomes]
                .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
                .map((outcome) => (
                  <li
                    key={outcome.id}
                    className="grid grid-cols-[1fr_auto] items-start gap-4"
                  >
                    <span>{outcome.description}</span>
                    <div className="flex gap-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setEditOutcomeIndex(
                            outcomes.findIndex((o) => o.id === outcome.id)
                          );
                          setNewOutcome({
                            description: outcome.description,
                            sequenceNumber: outcome.sequenceNumber,
                          });
                          setShowAddOutcome(true);
                        }}
                        className="text-yellow-600 hover:underline text-sm"
                      >
                        Edit
                      </button>

                      {/* Delete with Tooltip */}
                      <div className="relative group inline-block">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOutcome(outcome.id);
                          }}
                          className="text-red-600 text-sm font-medium hover:underline transition"
                        >
                          Delete
                        </button>
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all bg-black text-white text-xs px-3 py-1 rounded-md whitespace-nowrap z-10">
                          Remove this outcome
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500">No outcomes listed yet.</p>
          )}
        </div>
      </div>

      {/* Outcome Actions */}
      <div className="mt-6">
        {showAddOutcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">
                Add a New FAQ
              </h2>
              <form
                onSubmit={handleOutcomeSubmit}
                className="space-y-6 mt-6 max-w-2xl bg-white p-6 rounded-xl shadow-md"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outcome Description
                  </label>
                  <textarea
                    value={newOutcome.description}
                    onChange={(e) =>
                      setNewOutcome((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the course outcome"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sequence Number
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newOutcome.sequenceNumber}
                    disabled
                    className="w-full border border-gray-200 bg-gray-100 text-gray-600 px-4 py-2 rounded-md shadow-sm cursor-not-allowed"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                  >
                    {editOutcomeIndex !== null
                      ? "Update Outcome"
                      : "Add Outcome"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddOutcome(false);
                      setEditOutcomeIndex(null);
                      setNewOutcome({ description: "", sequenceNumber: 0 });
                    }}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
