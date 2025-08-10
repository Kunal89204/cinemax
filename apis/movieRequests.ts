import axiosInstance from "./axiosInstance";

const movieRequests = {
  getPopularMovies: async () => {
    const response = await axiosInstance.get("/movie/popular");
    return response.data;
  },
  getTopRatedMovies: async () => {
    const response = await axiosInstance.get("/movie/top_rated");
    return response.data;
  },
  getUpcomingMovies: async () => {
    const response = await axiosInstance.get("/movie/upcoming");
    return response.data;
  },
  getNowPlayingMovies: async () => {
    const response = await axiosInstance.get("/movie/now_playing");
    return response.data;
  },
};

export default movieRequests;
