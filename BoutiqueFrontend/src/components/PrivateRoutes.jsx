import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ requiredRole }) => {
  const token = sessionStorage.getItem("logintoken");
  const role = sessionStorage.getItem("role");
  const location = useLocation();

  if (!token || (requiredRole && role !== requiredRole)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
