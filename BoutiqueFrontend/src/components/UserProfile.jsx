import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the logged-in user data (from localStorage or API)
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);

    // Fetch orders from API (replace with actual API call)
    fetch("/api/orders") // Adjust this URL based on your backend route
      .then((res) => res.json())
      .then((data) => {
        // Filter orders based on logged-in user
        const userOrders = data.filter(
          (order) => order.customer === loggedInUser?.name
        );
        setOrders(userOrders);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  if (!user) {
    return (
      <Typography>
        <h1>Loading user data...</h1>
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Welcome, {user.name}
      </Typography>
      <Typography>Email: {user.email}</Typography>

      <Typography variant="h6" fontWeight="bold" mt={3}>
        Your Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map((order) => (
          <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
            <Typography>
              <strong>{order.product}</strong> x {order.quantity} {order.size}
            </Typography>
            <Typography>Price: ${order.price}</Typography>
            <Typography>Payment: {order.paymentStatus}</Typography>
            <Typography>Status: {order.status}</Typography>
            <Typography>Date: {order.date}</Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default UserProfile;
