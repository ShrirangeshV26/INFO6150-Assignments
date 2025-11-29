import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      // On success, go to home page
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Login failed. Check your credentials or server.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            required
          />
        </label>

        {error && <p style={{ color: "red", marginTop: "4px" }}>{error}</p>}

        <button
          type="submit"
          style={{
            padding: "10px",
            marginTop: "8px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
