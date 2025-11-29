import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:6000", // change if your backend runs elsewhere
});

// Automatically attach token if present
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
