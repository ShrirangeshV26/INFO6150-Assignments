import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import axiosClient from "../api/axiosClient";
import CompanyCard from "../components/CompanyCard";

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axiosClient.get("/images"); // change to your endpoint
        setCompanies(res.data);
      } catch (err) {
        console.error("Error fetching companies", err);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Company Showcase
      </Typography>
      <Grid container spacing={3}>
        {companies.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <CompanyCard company={c} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompanyShowcase;
