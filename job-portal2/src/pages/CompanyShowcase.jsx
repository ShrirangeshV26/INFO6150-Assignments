// src/pages/CompanyShowcase.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
};

const imgStyle = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  borderRadius: "6px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "16px",
};

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setError("");
        // 🔴 Hits GET http://localhost:5001/companies
        const res = await axiosClient.get("/companies");
        setCompanies(res.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Failed to load companies from server.");
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Company Showcase</h1>
      <p>Featured hiring companies:</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={gridStyle}>
        {companies.map((company) => (
          <div key={company.id} style={cardStyle}>
            {company.url ? (
              <img src={company.url} alt={company.name} style={imgStyle} />
            ) : (
              <div
                style={{
                  ...imgStyle,
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                }}
              >
                No Image
              </div>
            )}
            <h3 style={{ marginTop: "10px" }}>{company.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyShowcase;
