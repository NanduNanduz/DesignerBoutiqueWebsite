// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";

// const PrivateRoutes = ({ requiredRole, children }) => {
//   const token = sessionStorage.getItem("logintoken");
//   const role = sessionStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (requiredRole && role !== requiredRole) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default PrivateRoutes;

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
