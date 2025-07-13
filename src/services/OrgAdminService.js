import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

const token = localStorage.getItem("token");

const TOKEN = token;



// COURSES
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


//FAQS
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



// INSTRUCTORS
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





// OUTCOMES
export const getOutcomes = (cId) => {
  return axios.get(`${REST_API_BASE_URL}/api/courses/outcomes/${cId}`,{
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
}

export const addOutcome = (cId, newOutcome) => {
  return axios.post(
    `${REST_API_BASE_URL}/api/courses/outcomes`,
    {
      courseId: cId,           
      description: newOutcome.description,
      sequenceNumber: newOutcome.sequenceNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};

export const updateOutcome = (cId, outcomeId, newOutcome) => {
  return axios.put(
    `${REST_API_BASE_URL}/api/courses/outcomes/${outcomeId}`,
    {
      courseId: cId,           
      description: newOutcome.description,
      sequenceNumber: newOutcome.sequenceNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};

export const deleteOutcome = (outcomeId) => {
  return axios.delete(`${REST_API_BASE_URL}/api/courses/outcomes/ ${outcomeId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};


//REVIEWS
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
    `${REST_API_BASE_URL}/api/courses/${cId}/reviews/${reviewId}`,
    {
      courseId: cId, // Include courseId if your backend expects it
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


export const deleteReview = (cId, reviewId) => {
  return axios.delete(
    `${REST_API_BASE_URL}/api/courses/${cId}/reviews/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};


// SECTIONS
export const addSection = (newSection) => {
  return axios.post(
    `${REST_API_BASE_URL}/api/sections`,
    newSection,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
}

export const getSections = (cId) => {
  return axios.get(`${REST_API_BASE_URL}/api/sections/course/${cId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
};

export const publishSection = (sId) => {
  return axios.put(`${REST_API_BASE_URL}/api/sections/${sId}/publish`, null, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const unpublishSection = (sId) => {
  return axios.put(`${REST_API_BASE_URL}/api/sections/${sId}/unpublish`, null, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const deleteSection = (sId) => {
  return axios.delete(`${REST_API_BASE_URL}/api/sections/${sId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};


// CONTENTS
export const addContent = (newContent) => {
  return axios.post(
    `${REST_API_BASE_URL}/api/contents`,
    newContent,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};