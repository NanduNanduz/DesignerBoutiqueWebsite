import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import AdminLayout from "../components/AdminLayout";

const Admin = () => {
  return (
    <AdminLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            width: "50%",
            backgroundColor: "#CBAD8D",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome to Admin Panel
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage products, orders, and more efficiently.
          </Typography>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default Admin;
