import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://spotify-clone-production-c51c.up.railway.app/api",
})