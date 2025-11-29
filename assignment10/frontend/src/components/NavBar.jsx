import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

export default function NavBar(){
  const { type, name } = useSelector(s => s.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Assignment10 Portal</Typography>
        {name && <Typography sx={{ mr:2 }}>{name} ({type})</Typography>}
        <Button color="inherit" onClick={() => { dispatch(logout()); nav('/login'); }}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
