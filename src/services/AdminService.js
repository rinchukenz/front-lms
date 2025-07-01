import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

const token = localStorage.getItem("token");

const TOKEN = token; // Replace this with your actual token


export const getAllAdmins = () => {
  return axios.get(`${REST_API_BASE_URL}/api/admins`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
};


export const approveAdmin = (adminId) => {
  //const token = localStorage.getItem("token"); // assuming token is stored here
  return axios.put(`${REST_API_BASE_URL}/api/admins/${adminId}/approve`, null, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};



export const rejectAdmin = (adminId) => {
  //const token = localStorage.getItem("token"); // assuming token is stored here
  return axios.patch(`${REST_API_BASE_URL}/api/admins/${adminId}/reject`, null, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const deleteAdmin = (adminId) => {
  //const token = localStorage.getItem("token"); // assuming token is stored here
  return axios.delete(`${REST_API_BASE_URL}/api/admins/${adminId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const getAllOrgs = () => {
  return axios.get(`${REST_API_BASE_URL}/api/organizations`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });
}

export const registerOrg = (formData) => {
  return axios.post(`${REST_API_BASE_URL}/api/organizations`, formData, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  })
}

export const registerAdmin = (formData) => {
  return axios.post(`${REST_API_BASE_URL}/api/admins/register`, formData, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  })
}

export const suspendOrg = (orgId) => {
  return axios.put(`${REST_API_BASE_URL}/api/organizations/${orgId}/suspend`, null, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}

export const activateOrg = (orgId) => {
  return axios.put(`${REST_API_BASE_URL}/api/organizations/${orgId}/activate`, null, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}

export const deleteOrg = (orgId) => {
  return axios.delete(`${REST_API_BASE_URL}/api/organizations/${orgId}/force-delete`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}

export const getRecentActivities = (page = 0, size = 20) => {
  return axios.get(`${REST_API_BASE_URL}/api/activity-logs/recent`, {
    params: { page, size },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const getTotalOrganizations = () => {
  return axios.get(`${REST_API_BASE_URL}/api/organizations/count`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}

export const pendingRequests = () => {
  return axios.get(`${REST_API_BASE_URL}/api/admins/pending`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}


export const pendingCount = () => {
  return axios.get(`${REST_API_BASE_URL}/api/admins/pending/count`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}