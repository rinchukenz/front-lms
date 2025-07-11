import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addInstructor,
  addReview,
  createFaq,
  deleteCourse,
  deleteFaq,
  deleteInstructor,
  getCourseById,
  getFaq,
  getInstructors,
  getReviews,
  publishCourse,
  unpublishCourse,
  updateInstructor,
} from "../services/OrgAdminService";
import { toast } from "react-toastify";

function CoursePage() {
  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({
    studentId: "",
    rating: 0,
    comment: "",
  });
  const [editReviewIndex, setEditReviewIndex] = useState(null);

  const [showAddReview, setShowAddReview] = useState(false);

  const [editInstructorIndex, setEditInstructorIndex] = useState(null);

  const [showAddInstructor, setShowAddInstructor] = useState(false);

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

  useEffect(() => {
    fetchCourse();
    fetchFaqs();
    fetchInstructors();
    fetchReviews();
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
        const reviewToUpdate = instructors[editReviewIndex];
        const reviewId = reviewToUpdate.id;

        await updateReview(cId, reviewId, newReview);
        toast.success("Review updated successfully");
      } else {
        await addReview(cId, newReview);
        toast.success("Review added successfully");
      }

      setNewReview({ name: "", bio: "", profileImageUrl: "" });
      setShowAddReview(false);
      setEditReviewIndex(null);
      fetchReviews();
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error("Failed to save review");
    }
  };

  console.log("FAQ object:", faqs);

  if (!course) {
    return <div className="text-center mt-10">Loading course...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {course.title}
          </h1>
          <p className="text-lg text-gray-500 mb-6">{course.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/orgadmin/update-course/${cId}`)}
            className="bg-green-300 hover:bg-green-500 px-3 h-2/3 cursor-pointer"
          >
            Update Course
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-300 hover:bg-red-500 px-3 h-2/3 cursor-pointer"
          >
            Delete Course
          </button>
        </div>
      </div>

      {/* Thumbnail */}
      {course.thumbnailUrl && (
        <div className="mb-6">
          <img
            src={course.thumbnailUrl}
            alt="Course Thumbnail"
            className="w-full lg:w-[50%] max-h-[400px] object-cover rounded-md"
          />
        </div>
      )}

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          Description
        </h2>
        <p className="text-gray-600">{course.description}</p>
      </div>

      {/* Instructors Section */}
      <div className="mb-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Instructors
        </h2>

        {/* Existing instructors */}
        {instructors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {instructors.map((instructor, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
              >
                <img
                  src={instructor.profileImageUrl}
                  alt={instructor.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-800">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
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
                    className="px-3 py-1 cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleRemoveInstructor(instructor.id)}
                    className="px-3 py-1 cursor-pointer bg-red-400 hover:bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Buttons for Add or Cancel */}
        {!showAddInstructor && (
          <button
            onClick={() => {
              setShowAddInstructor(true);
              setEditInstructorIndex(null);
              setNewInstructor({ name: "", bio: "", profileImageUrl: "" });
            }}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add New Instructor
          </button>
        )}

        {/* Add / Update Instructor Form */}
        {showAddInstructor && (
          <form
            onSubmit={handleInstructorSubmit}
            className="space-y-4 max-w-xl"
          >
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
                className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  setNewInstructor((prev) => ({ ...prev, bio: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
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
                  setNewInstructor({ name: "", bio: "", profileImageUrl: "" });
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Tags */}
      {course.tags?.length > 0 && (
        <div className="mb-6 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm border-t pt-6 text-gray-700">
        <div>
          <span className="font-semibold">Language:</span> {course.language}
        </div>
        <div>
          <span className="font-semibold">Category:</span> {course.category}
        </div>
        <div>
          <span className="font-semibold">Visibility:</span> {course.visibility}
        </div>
        <div>
          <span className="font-semibold">Free/Paid:</span>{" "}
          {course.isFree ? "Free" : "Paid"}
        </div>
        <div>
          <span className="font-semibold">Published:</span>{" "}
          {course.isPublished ? "Yes" : "No"}
          <button
            onClick={handleTogglePublish}
            className={`ml-4 px-3 py-1 rounded-2xl text-xs ${
              course.isPublished
                ? "bg-red-300 hover:bg-red-500"
                : "bg-green-300 hover:bg-green-500"
            }`}
          >
            {course.isPublished ? "Unpublish Course" : "Publish Course"}
          </button>
        </div>
        <div>
          <span className="font-semibold">Created By:</span>{" "}
          {course.createdByAdminId}
        </div>
      </div>

      {/* Certificate Sample Modal Trigger */}
      {course.certificateSampleUrl && (
        <div className="mb-6  border-t pt-6">
          <button
            onClick={openModal}
            className="text-blue-600 underline hover:text-blue-800"
          >
            View Sample Certificate
          </button>
        </div>
      )}

      {/* Certificate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative w-[90vw] h-[90vh] bg-white rounded-md shadow-xl overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-3xl font-bold text-gray-700 hover:text-black z-10"
            >
              &times;
            </button>
            <iframe
              src={course.certificateSampleUrl}
              title="Certificate Sample"
              className="w-full h-full border-none"
            ></iframe>
          </div>
        </div>
      )}

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <div className="mt-12  border-t pt-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-xl overflow-hidden shadow-sm transition-all duration-300"
              >
                {/* FAQ Header */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <span className="text-gray-800 font-medium text-base">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
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
                </button>

                {/* FAQ Answer + Delete Button */}
                {faqOpen[index] && (
                  <div className="px-6 py-4 bg-white border-t text-gray-700 space-y-2">
                    <p className="text-sm leading-relaxed">{faq.answer}</p>
                    <div className="text-right">
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="text-red-600 text-sm font-medium hover:underline transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create FAQ Section */}
      <div className="mt-8 py-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add a New FAQ
        </h2>
        <form onSubmit={handleFaqSubmit} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              value={newFaq.question}
              onChange={(e) =>
                setNewFaq((prev) => ({ ...prev, question: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the question"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <textarea
              rows={3}
              value={newFaq.answer}
              onChange={(e) =>
                setNewFaq((prev) => ({ ...prev, answer: e.target.value }))
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the answer"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Add FAQ
          </button>
        </form>
      </div>

      {/* Reviews Section */}
      <div className="mb-8 border-t pt-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Reviews
        </h2>

        {/* Existing Reviews */}
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-semibold text-gray-800">
                    {review.studentId}
                  </h3>
                  <div className="flex items-center space-x-1 text-yellow-500 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 ${
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
                <p className="text-gray-700 text-sm">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Buttons for Add or Cancel of Review */}
        {!showAddReview && (
          <button
            onClick={() => {
              setShowAddReview(true);
              setEditReviewIndex(null);
              setNewReview({ studentId: "", rating: 0, comment: "" });
            }}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add New Review
          </button>
        )}

        {/* Add / Update Review Form */}
        {showAddReview && (
          <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-xl">
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
                className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                rows={3}
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write your review here"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
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
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
