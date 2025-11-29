import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminUsers from './pages/AdminUsers';
import AddJob from './pages/AddJob';
import Jobs from './pages/Jobs';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';

export default function App(){
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers/></ProtectedRoute>} />
        <Route path="/add-job" element={<ProtectedRoute role="admin"><AddJob/></ProtectedRoute>} />

        <Route path="/jobs" element={<ProtectedRoute role="employee"><Jobs/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
