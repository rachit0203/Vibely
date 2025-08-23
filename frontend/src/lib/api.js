import { axiosInstance } from "./axios"

export const signup  = async (signupData) => {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data; 
}

export const login  = async (loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data; 
}

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
    const res = await axiosInstance.post("/auth/onboarding", userData);
    return res.data;
}



export const getUserFriends = async () => {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
}

export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data?.recommendedUser || [];
}

export const getOutgoingFriendReqs = async () => { 
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
}

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
}


export const getFriendRequests = async () => {
  const res = await axiosInstance.get(`/users/friend-requests`);
  return res.data;
}

export const acceptFriendRequest = async (requestId) => {
  const res = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return res.data;
}

export const getStreamToken = async () => {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
}

export const rejectFriendRequest = async (requestId) => {
  const res = await axiosInstance.put(`/users/friend-request/${requestId}/reject`);
  return res.data;
}

export const updateProfile = async (data) => {
  const response = await axiosInstance.patch("/users/profile", data);
  return response.data;
};

export const removeFriend = async (friendId) => {
  const response = await axiosInstance.delete(`/users/friends/${friendId}`);
  return response.data;
};

export const declineFriendRequest = async (requestId) => {
  const response = await axiosInstance.delete(`/users/friend-requests/${requestId}/decline`);
  return response.data;
};