import React, { useEffect, useState } from "react";
import {
  addOutcome,
  deleteOutcome,
  getOutcomes,
  updateOutcome,
} from "../../services/OrgAdminService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function CourseOutcomes() {
  const { cId } = useParams();

  const [newOutcome, setNewOutcome] = useState({
    description: "",
    sequenceNumber: 0,
  });
  const [outcomes, setOutcomes] = useState([]);
  const [editOutcomeIndex, setEditOutcomeIndex] = useState(null);
  const [showAddOutcome, setShowAddOutcome] = useState(false);

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
    fetchOutcomes();
  }, [cId]);

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
  return (
    <div>
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

export default CourseOutcomes;
