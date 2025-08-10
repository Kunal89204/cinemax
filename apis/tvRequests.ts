import axiosInstance from "./axiosInstance";


const tvRequests = {
    getPopularTvShows: async () => {
        const response = await axiosInstance.get("/tv/popular");
        return response.data;
    },
    getTopRatedTvShows: async () => {
        const response = await axiosInstance.get("/tv/top_rated");
        return response.data;
    },
    getLatestTvShows: async () => {
        const response = await axiosInstance.get("/tv/on_the_air");
        return response.data;
    },
}

export default tvRequests;