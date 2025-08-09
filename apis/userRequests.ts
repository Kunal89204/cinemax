import axiosInstance from "./axiosInstance";

const userRequests = {
  getAccountDetails: async (sessionId: string|null) => {
    const response = await axiosInstance.get("/account", {
      params: {
        session_id: sessionId,
      },
    });
    return response.data;
  },
};

export default userRequests;