import React from "react";

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const badgeStyle = {
  display: "inline-block",
  padding: "4px 8px",
  borderRadius: "999px",
  backgroundColor: "#f0f0f0",
  fontSize: "12px",
  marginRight: "6px",
  marginTop: "4px",
};

const JobCard = ({ job }) => {
  return (
    <div style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>{job.title}</h2>

      <p>{job.description}</p>

      <p style={{ fontSize: "14px", color: "#666" }}>{job.lastUpdated}</p>

      <p style={{ fontWeight: "bold" }}>Salary: {job.salary}</p>

      <div style={{ marginTop: "8px", marginBottom: "8px" }}>
        {job.skills?.map((skill) => (
          <span key={skill} style={badgeStyle}>
            {skill}
          </span>
        ))}
      </div>

      <a
        href={job.applyLink}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}
      >
        Apply Now →
      </a>
    </div>
  );
};

export default JobCard;
