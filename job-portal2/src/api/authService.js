// src/api/authService.js
import axiosClient from "./axiosClient";

export const login = async (email, password) => {
  // Adjust the URL and field names if your Assignment 8 backend is different
  const res = await axiosClient.post("/user/login", {
    email,
    password,
  });

  // Expecting backend returns { token, user }
  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
