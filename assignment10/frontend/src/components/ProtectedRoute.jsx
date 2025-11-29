import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }){
  const { token, type } = useSelector(s => s.user);
  if(!token) return <Navigate to="/login" replace />;
  if(role && role !== type) return <Navigate to="/login" replace />;
  return children;
}
