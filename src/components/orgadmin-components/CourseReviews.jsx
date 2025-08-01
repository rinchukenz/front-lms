import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../../services/OrgAdminService";
import { toast } from "react-toastify";

function CourseReviews() {
  const { cId } = useParams();

  const [newReview, setNewReview] = useState({
    studentId: "",
    rating: 0,
    comment: "",
  });
  const [reviews, setReviews] = useState([]);
  const [editReviewIndex, setEditReviewIndex] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await getReviews(cId);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
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

  useEffect(() => {
    fetchReviews();
  }, [cId]);
  return (
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
  );
}

export default CourseReviews;
