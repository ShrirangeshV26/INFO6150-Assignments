import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../api/axios';
import { Container, TextField, Button, Box, CircularProgress } from '@mui/material';

export default function AddJob(){
  const { token } = useSelector(s => s.user);
  const [loading,setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      await api.post('/create/job', {
        companyName: e.target.companyName.value,
        title: e.target.title.value,
        description: e.target.description.value,
        salary: Number(e.target.salary.value)
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Job created');
      e.target.reset();
    }catch(err){ alert(err.response?.data?.msg || err.message); }
    finally{ setLoading(false); }
  }

  return (
    <Container maxWidth="sm" sx={{ mt:4 }}>
      <Box component="form" onSubmit={submit} sx={{ display:'flex', flexDirection:'column', gap:2 }}>
        <TextField name="companyName" label="Company Name" required />
        <TextField name="title" label="Job Title" required />
        <TextField name="description" label="Description" multiline rows={4} />
        <TextField name="salary" label="Salary" type="number" />
        <Button type="submit" variant="contained">{loading? <CircularProgress size={20} /> : 'Create'}</Button>
      </Box>
    </Container>
  );
}
