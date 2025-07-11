import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

const token = localStorage.getItem("token");

const TOKEN = token;

// http://localhost:8080/api/courses/org/b7a0daa7-6bb8-4cb0-b6ee-7e7193917aa8

export const getAllCourses = (orgId) => {
  return axios.get(`${REST_API_BASE_URL}/api/courses/org/${orgId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
};

export const createCourse = (formData) => {
  return axios.post(`${REST_API_BASE_URL}/api/courses`, formData, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  })
}

export const getCourseById = (cId) => {
  return axios.get(`${REST_API_BASE_URL}/api/courses/${cId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
};

export const getFaq = (cId) => {
  return axios.get(`${REST_API_BASE_URL}/api/courses/${cId}/faqs`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
};

export const createFaq = (cId, newFaq) => {
  return axios.post(
    `${REST_API_BASE_URL}/api/courses/${cId}/faqs`,
    {
      courseId: cId,           // Include courseId here
      question: newFaq.question,
      answer: newFaq.answer,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};



export const deleteFaq = (cId, fId) => {
  return axios.delete(`${REST_API_BASE_URL}/api/courses/${cId}/faqs/${fId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const addInstructor = (cId, newInstructor) => {
  return axios.post(
    `${REST_API_BASE_URL}/api/courses/${cId}/instructors`,
    {
      courseId: cId,           
      name: newInstructor.name,
      bio: newInstructor.bio,
      profileImageUrl: newInstructor.profileImageUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};

export const getInstructors = (cId) => {
  return axios.get(`${REST_API_BASE_URL}/api/courses/${cId}/instructors`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
};

export const updateInstructor = (cId, instructorId, updatedData) => {
  return axios.put(
    `${REST_API_BASE_URL}/api/courses/${cId}/instructors/${instructorId}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};

export const deleteInstructor = (cId, instructorId) => {
  return axios.delete(`${REST_API_BASE_URL}/api/courses/${cId}/instructors/${instructorId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const EditCourse = (cId, updatedData) => {
  return axios.put(`${REST_API_BASE_URL}/api/courses/${cId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};


export const deleteCourse = (cId) => {
  return axios.delete(`${REST_API_BASE_URL}/api/courses/${cId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const publishCourse = (cId) => {
  return axios.put(`${REST_API_BASE_URL}/api/courses/${cId}/publish`, null, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const unpublishCourse = (cId) => {
  return axios.put(`${REST_API_BASE_URL}/api/courses/${cId}/unpublish`, null, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const getReviews = (cId) => {
  return axios.get(`${REST_API_BASE_URL}/api/courses/${cId}/reviews`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
};

export const addReview = (cId, newReview) => {
  return axios.post(
    `${REST_API_BASE_URL}/api/courses/${cId}/reviews`,
    {
      courseId: cId,           
      studentId: newReview.studentId,
      rating: newReview.rating,
      comment: newReview.comment,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};

export const updateReview = (cId, reviewId, newReview) => {
  return axios.put(
    `${REST_API_BASE_URL}/api/courses/${cId}/instructors/${reviewId}`,
    newReview,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};