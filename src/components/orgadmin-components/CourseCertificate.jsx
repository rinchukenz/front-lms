import React, { useState } from "react";

function CourseCertificate({ course }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseCertificate;
