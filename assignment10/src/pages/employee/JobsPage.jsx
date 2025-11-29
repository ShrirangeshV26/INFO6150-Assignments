// src/pages/employee/JobsPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../slices/jobsSlice";

const JobsPage = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div>
      <h2>Available Jobs</h2>
      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && list.length === 0 && <p>No jobs found.</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "16px",
        }}
      >
        {list.map((job) => (
          <div
            key={job._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            <h3>{job.jobTitle}</h3>
            <p>
              <strong>Company:</strong> {job.companyName}
            </p>
            <p>{job.description}</p>
            <p>
              <strong>Salary:</strong> {job.salary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
