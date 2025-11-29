import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import JobListings from "./pages/JobListings";
import CompanyShowcase from "./pages/CompanyShowcase";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated, logout } from "./api/authService";

const Navbar = () => {
  const authed = isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        marginBottom: "20px",
        display: "flex",
        gap: "15px",
        alignItems: "center",
      }}
    >
      {authed && (
        <>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/contact">Contact</Link>
        </>
      )}

      <div style={{ marginLeft: "auto" }}>
        {!authed ? (
          <Link to="/login">Login</Link>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 10px",
              backgroundColor: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobListings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <CompanyShowcase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
