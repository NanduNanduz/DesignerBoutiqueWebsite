// import React from "react";
// import { Outlet } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// const PrivateRoutes = () => {
//   const token = sessionStorage.getItem("logintoken");
//   let verifyUser = false;
//   if (token) {
//     verifyUser = true;
//   }

//   return verifyUser ? <Outlet /> : <Navigate to={"/"} />;
// };

// /* outlet is a respective component .it will load when the user is verified */

// export default PrivateRoutes;



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

