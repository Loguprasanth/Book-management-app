import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000", // JSON Server running locally
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
