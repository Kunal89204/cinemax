import axiosInstance from "./axiosInstance";

const authRequests = {
  getToken: async () => {
    const response = await axiosInstance.get("authentication/token/new");
    return response.data;
  },
  login: async (username: string, password: string, requestToken: string) => {
    const response = await axiosInstance.post(
      "authentication/token/validate_with_login",
      {
        username,
        password,
        request_token: requestToken,
      }
    );
    return response.data;
  },

  getSession: async (requestToken: string) => {
    const response = await axiosInstance.post("authentication/session/new", {
      request_token: requestToken,
    });
    return response.data;
  },
};

export default authRequests;
