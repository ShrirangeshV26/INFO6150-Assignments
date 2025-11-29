import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, CircularProgress } from '@mui/material';

export default function Login(){
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value; const password = e.target.password.value;
    try{
      const res = await api.post('/login', { email, password });
      dispatch(loginSuccess(res.data));
      if(res.data.type === 'admin') nav('/admin/users'); else nav('/jobs');
    }catch(err){
      alert(err.response?.data?.msg || err.message);
    }finally{ setLoading(false); }
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={submit} sx={{ mt:6, display:'flex', flexDirection:'column', gap:2 }}>
        <TextField name="email" label="Email" required />
        <TextField name="password" label="Password" type="password" required />
        <Button type="submit" variant="contained" disabled={loading}>{loading? <CircularProgress size={20} /> : 'Login'}</Button>
      </Box>
    </Container>
  );
}
