import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('jwtToken');
  let isAdmin = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.role && decodedToken.role.toLowerCase() === 'admin';
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return (
    <Route
      {...rest}
      element={isAdmin ? <Element /> : <Navigate to="/unauthorized" />}
    />

    
  );

  
};

export default AdminRoute;
