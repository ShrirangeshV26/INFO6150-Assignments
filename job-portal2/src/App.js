import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>React Job Portal</h1>
      <p>Welcome to the Job Portal home page.</p>
    </div>
  );
}

function LoginPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <p>(We will connect this to your backend later.)</p>
    </div>
  );
}

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
        <Link to="/login">Login</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
