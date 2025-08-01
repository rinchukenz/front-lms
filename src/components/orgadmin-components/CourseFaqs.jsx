import React, { useEffect, useState } from "react";
import { createFaq, deleteFaq, getFaq } from "../../services/OrgAdminService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function CourseFaqs() {
  const { cId } = useParams();

  const [showAddFaq, setShowAddFaq] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [faqOpen, setFaqOpen] = useState({});

  const toggleFaq = (index) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const fetchFaqs = async () => {
    try {
      const response = await getFaq(cId);
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
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

  useEffect(() => {
    fetchFaqs();
  }, [cId]);

  return (
    <div className="mb-12 border-t border-[#A2A2A2] pt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Frequently Asked Questions
        </h2>
        {!showAddFaq && (
          <button
            onClick={() => {
              setShowAddFaq(true);
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
  );
}

export default CourseFaqs;
