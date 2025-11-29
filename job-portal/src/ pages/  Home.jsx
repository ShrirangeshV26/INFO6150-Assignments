import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the React Job Portal
      </Typography>
      <Typography>
        Browse latest job listings, explore companies, and find your next
        opportunity.
      </Typography>
    </Container>
  );
};

export default Home;
