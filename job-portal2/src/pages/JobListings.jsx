import React from "react";
import { jobPosts } from "../data/jobPosts";
import JobCard from "../components/JobCard";

const JobListings = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Listings</h1>
      <p>Browse the latest job opportunities:</p>

      {jobPosts.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;
