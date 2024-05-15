// import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';

const PrivateRoute = () => {
  const { checkIfAuthenticated } = useAuth();

  const isAuthenticated = checkIfAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
