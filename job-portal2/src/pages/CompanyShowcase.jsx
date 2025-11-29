import React from "react";

const companies = [
  {
    id: 1,
    name: "Google",
    imageUrl: "https://via.placeholder.com/300x160?text=Google+Logo",
  },
  {
    id: 2,
    name: "Amazon",
    imageUrl: "https://via.placeholder.com/300x160?text=Amazon+Logo",
  },
  {
    id: 3,
    name: "Microsoft",
    imageUrl: "https://via.placeholder.com/300x160?text=Microsoft+Logo",
  },
];

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
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
  return (
    <div style={{ padding: "20px" }}>
      <h1>Company Showcase</h1>
      <p>Featured hiring companies:</p>

      <div style={gridStyle}>
        {companies.map((company) => (
          <div key={company.id} style={cardStyle}>
            <img src={company.imageUrl} alt={company.name} style={imgStyle} />
            <h3 style={{ marginTop: "10px" }}>{company.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyShowcase;
