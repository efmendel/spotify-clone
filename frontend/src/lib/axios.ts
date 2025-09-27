import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api" // Local development
      : "https://spotify-clone-production-c51c.up.railway.app/api", // Production
});
