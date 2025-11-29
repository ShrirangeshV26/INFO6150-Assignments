import axiosClient from "./axiosClient";

export const login = async (email, password) => {
  const res = await axiosClient.post("/user/login", { email, password });

  console.log("LOGIN RESPONSE >>>", res.data);

  // Your backend returns: { message: "Login successful." }
  // So we check the message and then create a fake token + minimal user
  if (res.data.message !== "Login successful.") {
    throw new Error("Login not successful");
  }

  // Since backend is not sending a token yet, we just store a dummy token
  const token = "dummy-token";
  const user = { email };

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
