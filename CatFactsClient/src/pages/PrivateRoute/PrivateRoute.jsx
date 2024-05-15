// import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const PrivateRoute = () => {
  const { checkIfAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticatedResult = await checkIfAuthenticated();

        setIsAuthenticated(isAuthenticatedResult);
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false); 
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    // Render a loading state (e.g., spinner, loading message)
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
