import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import JobListings from "./pages/JobListings";
import CompanyShowcase from "./pages/CompanyShowcase";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      {/* Simple Navbar for now */}
      <nav
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        <Link to="/" style={{ marginRight: "15px" }}>
          Home
        </Link>
        <Link to="/about" style={{ marginRight: "15px" }}>
          About
        </Link>
        <Link to="/jobs" style={{ marginRight: "15px" }}>
          Jobs
        </Link>
        <Link to="/companies" style={{ marginRight: "15px" }}>
          Companies
        </Link>
        <Link to="/contact" style={{ marginRight: "15px" }}>
          Contact
        </Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/companies" element={<CompanyShowcase />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
