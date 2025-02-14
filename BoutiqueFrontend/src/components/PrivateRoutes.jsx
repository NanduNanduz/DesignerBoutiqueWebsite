

import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ requiredRole }) => {
  const token = sessionStorage.getItem("logintoken");
  const role = sessionStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  // If a required role is provided, check if the user matches it
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;

