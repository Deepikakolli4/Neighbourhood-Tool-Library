import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  return token ? <Component {...rest} /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
