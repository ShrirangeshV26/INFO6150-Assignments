// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:6000", // change if your backend uses a different port
});

// You can also attach token automatically later if needed
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // we will set this after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
