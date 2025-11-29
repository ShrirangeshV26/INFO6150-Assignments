import { Container, Grid, Typography } from "@mui/material";
import { jobPosts } from "../data/jobPosts";
import JobCard from "../components/JobCard";

const JobListings = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>
      <Grid container spacing={3}>
        {jobPosts.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobListings;
