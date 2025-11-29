import React, { useEffect } from 'react';
import api from '../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs, setLoading } from '../redux/jobSlice';
import { Card, CardContent, Typography, Container, Grid, CircularProgress } from '@mui/material';

export default function Jobs(){
  const dispatch = useDispatch();
  const { token } = useSelector(s => s.user);
  const { items, loading } = useSelector(s => s.jobs);

  useEffect(()=>{
    dispatch(setLoading(true));
    api.get('/jobs', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => dispatch(setJobs(res.data)))
      .catch(err => alert(err.response?.data?.msg || err.message))
      .finally(()=> dispatch(setLoading(false)));
  },[]);

  if(loading) return <CircularProgress />;

  return (
    <Container sx={{ mt:3 }}>
      <Grid container spacing={2}>
        {items.map(j => (
          <Grid item xs={12} md={6} key={j._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{j.title}</Typography>
                <Typography variant="subtitle2">{j.companyName}</Typography>
                <Typography>{j.description}</Typography>
                <Typography>Salary: {j.salary}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
