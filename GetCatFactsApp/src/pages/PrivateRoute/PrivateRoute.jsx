// import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  if (auth.CheckIfAuthenticated()){
    return <Outlet/>
  }
  return <Navigate to="/login" />;

  }



export default PrivateRoute;
