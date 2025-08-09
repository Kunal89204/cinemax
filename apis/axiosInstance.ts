import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params:{
    api_key: process.env.TMDB_API_KEY,
  }
});

export default axiosInstance;