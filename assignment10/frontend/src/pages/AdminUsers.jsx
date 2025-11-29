import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useSelector } from 'react-redux';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Button } from '@mui/material';

export default function AdminUsers(){
  const { token } = useSelector(s => s.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    api.get('/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res=> setUsers(res.data))
      .catch(err=> alert(err.response?.data?.msg || err.message))
      .finally(()=> setLoading(false));
  },[]);

  if(loading) return <CircularProgress />;

  return (
    <Container sx={{mt:3}}>
      <Button href="/add-job" variant="contained" sx={{ mb:2 }}>Add Job</Button>
      <Table>
        <TableHead>
          <TableRow><TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>Type</TableCell></TableRow>
        </TableHead>
        <TableBody>
          {users.map(u => (
            <TableRow key={u._id}><TableCell>{u.name}</TableCell><TableCell>{u.email}</TableCell><TableCell>{u.type}</TableCell></TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
