import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ element: Element, ...rest }) => {

  return (
      <h1>Dashboard</h1>
  );

  
};

export default AdminRoute;
