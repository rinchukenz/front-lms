// import axios from "axios";

// import axiosInstance from "../utils/axiosInstance";

// const REST_API_BASE_URL = "http://localhost:8080";

// const token = localStorage.getItem("token");

// const TOKEN = token;



// // COURSES
// export const getAllCourses = (orgId) => {
//   return axios.get(`${REST_API_BASE_URL}/api/courses/org/${orgId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   });
// };

// export const createCourse = (formData) => {
//   return axios.post(`${REST_API_BASE_URL}/api/courses`, formData, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   })
// }

// export const getCourseById = (cId) => {
//   return axios.get(`${REST_API_BASE_URL}/api/courses/${cId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   });
// };

// export const EditCourse = (cId, updatedData) => {
//   return axios.put(`${REST_API_BASE_URL}/api/courses/${cId}`, updatedData, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };


// export const deleteCourse = (cId) => {
//   return axios.delete(`${REST_API_BASE_URL}/api/courses/${cId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };

// export const publishCourse = (cId) => {
//   return axios.put(`${REST_API_BASE_URL}/api/courses/${cId}/publish`, null, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };

// export const unpublishCourse = (cId) => {
//   return axios.put(`${REST_API_BASE_URL}/api/courses/${cId}/unpublish`, null, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };


// //FAQS
// export const getFaq = (cId) => {
//   return axios.get(`${REST_API_BASE_URL}/api/courses/${cId}/faqs`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   });
// };

// export const createFaq = (cId, newFaq) => {
//   return axios.post(
//     `${REST_API_BASE_URL}/api/courses/${cId}/faqs`,
//     {
//       courseId: cId,           // Include courseId here
//       question: newFaq.question,
//       answer: newFaq.answer,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     }
//   );
// };



// export const deleteFaq = (cId, fId) => {
//   return axios.delete(`${REST_API_BASE_URL}/api/courses/${cId}/faqs/${fId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };



// // INSTRUCTORS
// export const addInstructor = (cId, newInstructor) => {
//   return axios.post(
//     `${REST_API_BASE_URL}/api/courses/${cId}/instructors`,
//     {
//       courseId: cId,           
//       name: newInstructor.name,
//       bio: newInstructor.bio,
//       profileImageUrl: newInstructor.profileImageUrl,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     }
//   );
// };

// export const getInstructors = (cId) => {
//   return axios.get(`${REST_API_BASE_URL}/api/courses/${cId}/instructors`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   });
// };

// export const updateInstructor = (cId, instructorId, updatedData) => {
//   return axios.put(
//     `${REST_API_BASE_URL}/api/courses/${cId}/instructors/${instructorId}`,
//     updatedData,
//     {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     }
//   );
// };

// export const deleteInstructor = (cId, instructorId) => {
//   return axios.delete(`${REST_API_BASE_URL}/api/courses/${cId}/instructors/${instructorId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };





// // OUTCOMES
// export const getOutcomes = (cId) => {
//   return axios.get(`${REST_API_BASE_URL}/api/courses/outcomes/${cId}`,{
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   });
// }

// export const addOutcome = (cId, newOutcome) => {
//   return axios.post(
//     `${REST_API_BASE_URL}/api/courses/outcomes`,
//     {
//       courseId: cId,           
//       description: newOutcome.description,
//       sequenceNumber: newOutcome.sequenceNumber,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     }
//   );
// };

// export const updateOutcome = (cId, outcomeId, newOutcome) => {
//   return axios.put(
//     `${REST_API_BASE_URL}/api/courses/outcomes/${outcomeId}`,
//     {
//       courseId: cId,           
//       description: newOutcome.description,
//       sequenceNumber: newOutcome.sequenceNumber,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     }
//   );
// };

// export const deleteOutcome = (outcomeId) => {
//   return axios.delete(`${REST_API_BASE_URL}/api/courses/outcomes/${outcomeId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };


// //REVIEWS
// export const getReviews = (cId) => {
//   return axios.get(`${REST_API_BASE_URL}/api/courses/${cId}/reviews`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   });
// };

// export const addReview = (cId, newReview) => {
//   return axios.post(
//     `${REST_API_BASE_URL}/api/courses/${cId}/reviews`,
//     {
//       courseId: cId,           
//       studentId: newReview.studentId,
//       rating: newReview.rating,
//       comment: newReview.comment,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     }
//   );
// };

// export const updateReview = (cId, reviewId, newReview) => {
//   return axios.put(
//     `${REST_API_BASE_URL}/api/courses/${cId}/reviews/${reviewId}`,
//     {
//       courseId: cId, // Include courseId if your backend expects it
//       studentId: newReview.studentId,
//       rating: newReview.rating,
//       comment: newReview.comment,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     }
//   );
// };


// export const deleteReview = (cId, reviewId) => {
//   return axios.delete(
//     `${REST_API_BASE_URL}/api/courses/${cId}/reviews/${reviewId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     }
//   );
// };


// // SECTIONS
// export const addSection = (newSection) => {
//   return axios.post(
//     `${REST_API_BASE_URL}/api/sections`,
//     newSection,
//     {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     }
//   );
// }

// export const getSections = (cId) => {
//   return axios.get(`${REST_API_BASE_URL}/api/sections/course/${cId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   });
// };

// export const publishSection = (sId) => {
//   return axios.put(`${REST_API_BASE_URL}/api/sections/${sId}/publish`, null, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };

// export const unpublishSection = (sId) => {
//   return axios.put(`${REST_API_BASE_URL}/api/sections/${sId}/unpublish`, null, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };

// export const deleteSection = (sId) => {
//   return axios.delete(`${REST_API_BASE_URL}/api/sections/${sId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };


// // CONTENTS
// export const addContent = (newContent) => {
//   return axios.post(
//     `${REST_API_BASE_URL}/api/contents`,
//     newContent,
//     {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     }
//   );
// };

// export const getContents = (cId) => {
//   return axios.get(`${REST_API_BASE_URL}/api/contents/course/${cId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   });
// }

// export const getContentsBySectionId = (sId) => {
//   return axios.get(`${REST_API_BASE_URL}/api/contents/section/${sId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   });
// }



// export const deleteContent = (contentId) => {
//   return axios.delete(`${REST_API_BASE_URL}/api/contents/${contentId}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };

// export const publishContent = (contentId) => {
//   return axios.put(`${REST_API_BASE_URL}/api/contents/${contentId}/publish`, null, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };

// export const unpublishContent = (contentId) => {
//   return axios.put(`${REST_API_BASE_URL}/api/contents/${contentId}/unpublish`, null, {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//     },
//   });
// };



































// src/services/OrgAdminService.js
import axiosInstance from "../utils/axiosInstance";

// COURSES
export const getAllCourses = (orgId) => {
  return axiosInstance.get(`/courses/org/${orgId}`);
};

export const createCourse = (formData) => {
  return axiosInstance.post(`/courses`, formData);
};

export const getCourseById = (cId) => {
  return axiosInstance.get(`/courses/${cId}`);
};

export const EditCourse = (cId, updatedData) => {
  return axiosInstance.put(`/courses/${cId}`, updatedData);
};

export const deleteCourse = (cId) => {
  return axiosInstance.delete(`/courses/${cId}`);
};

export const publishCourse = (cId) => {
  return axiosInstance.put(`/courses/${cId}/publish`);
};

export const unpublishCourse = (cId) => {
  return axiosInstance.put(`/courses/${cId}/unpublish`);
};

// FAQS
export const getFaq = (cId) => {
  return axiosInstance.get(`/courses/${cId}/faqs`);
};

export const createFaq = (cId, newFaq) => {
  return axiosInstance.post(`/courses/${cId}/faqs`, {
    courseId: cId,
    question: newFaq.question,
    answer: newFaq.answer,
  });
};

export const deleteFaq = (cId, fId) => {
  return axiosInstance.delete(`/courses/${cId}/faqs/${fId}`);
};

// INSTRUCTORS
export const addInstructor = (cId, newInstructor) => {
  return axiosInstance.post(`/courses/${cId}/instructors`, {
    courseId: cId,
    name: newInstructor.name,
    bio: newInstructor.bio,
    profileImageUrl: newInstructor.profileImageUrl,
  });
};

export const getInstructors = (cId) => {
  return axiosInstance.get(`/courses/${cId}/instructors`);
};

export const updateInstructor = (cId, instructorId, updatedData) => {
  return axiosInstance.put(`/courses/${cId}/instructors/${instructorId}`, updatedData);
};

export const deleteInstructor = (cId, instructorId) => {
  return axiosInstance.delete(`/courses/${cId}/instructors/${instructorId}`);
};

// OUTCOMES
export const getOutcomes = (cId) => {
  return axiosInstance.get(`/courses/outcomes/${cId}`);
};

export const addOutcome = (cId, newOutcome) => {
  return axiosInstance.post(`/courses/outcomes`, {
    courseId: cId,
    description: newOutcome.description,
    sequenceNumber: newOutcome.sequenceNumber,
  });
};

export const updateOutcome = (cId, outcomeId, newOutcome) => {
  return axiosInstance.put(`/courses/outcomes/${outcomeId}`, {
    courseId: cId,
    description: newOutcome.description,
    sequenceNumber: newOutcome.sequenceNumber,
  });
};

export const deleteOutcome = (outcomeId) => {
  return axiosInstance.delete(`/courses/outcomes/${outcomeId}`);
};

// REVIEWS
export const getReviews = (cId) => {
  return axiosInstance.get(`/courses/${cId}/reviews`);
};

export const addReview = (cId, newReview) => {
  return axiosInstance.post(`/courses/${cId}/reviews`, {
    courseId: cId,
    studentId: newReview.studentId,
    rating: newReview.rating,
    comment: newReview.comment,
  });
};

export const updateReview = (cId, reviewId, newReview) => {
  return axiosInstance.put(`/courses/${cId}/reviews/${reviewId}`, {
    courseId: cId,
    studentId: newReview.studentId,
    rating: newReview.rating,
    comment: newReview.comment,
  });
};

export const deleteReview = (cId, reviewId) => {
  return axiosInstance.delete(`/courses/${cId}/reviews/${reviewId}`);
};

// SECTIONS
export const addSection = (newSection) => {
  return axiosInstance.post(`/sections`, newSection);
};

export const getSections = (cId) => {
  return axiosInstance.get(`/sections/course/${cId}`);
};

export const publishSection = (sId) => {
  return axiosInstance.put(`/sections/${sId}/publish`);
};

export const unpublishSection = (sId) => {
  return axiosInstance.put(`/sections/${sId}/unpublish`);
};

export const deleteSection = (sId) => {
  return axiosInstance.delete(`/sections/${sId}`);
};

// CONTENTS
export const addContent = (newContent) => {
  return axiosInstance.post(`/contents`, newContent);
};

export const getContents = (cId) => {
  return axiosInstance.get(`/contents/course/${cId}`);
};

export const getContentsBySectionId = (sId) => {
  return axiosInstance.get(`/contents/section/${sId}`);
};

export const deleteContent = (contentId) => {
  return axiosInstance.delete(`/contents/${contentId}`);
};

export const publishContent = (contentId) => {
  return axiosInstance.put(`/contents/${contentId}/publish`);
};

export const unpublishContent = (contentId) => {
  return axiosInstance.put(`/contents/${contentId}/unpublish`);
};
