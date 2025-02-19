import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { jwtDecode } from "jwt-decode";

// Install using 'npm install jwt-decode'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch logged-in user from sessionStorage token
    const token = sessionStorage.getItem("logintoken");

    
if (token) {
  try {
    const decodedToken = jwtDecode(token); // Fix: Use jwtDecode
    setUser(decodedToken);
  } catch (error) {
    console.error("Error decoding token:", error);
  }
}

    // Fetch user-specific orders from API
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/order/user-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, []);

  if (!user) {
    return (
      <Typography color="red" mt={4}>
        No user found. Please log in.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" color="red" gutterBottom>
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
          <Paper key={order._id} sx={{ p: 2, mb: 2 }}>
            <Typography>
              <strong>Order ID:</strong> {order._id}
            </Typography>
            <Typography>
              <strong>Total Price:</strong> ₹{order.totalAmount}
            </Typography>
            <Typography>
              <strong>Payment Method:</strong>{" "}
              {order.paymentMethod.toUpperCase()}
            </Typography>
            <Typography>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </Typography>
            <Typography>
              <strong>Order Status:</strong> {order.orderStatus}
            </Typography>
            <Typography>
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </Typography>

            <Typography variant="h6" mt={2}>
              Product:
            </Typography>
            {order.products.map((product, index) => (
              <Paper key={index} sx={{ p: 2, mt: 1 }}>
                <Box display="flex" alignItems="center">
                  <img
                    src={product.image || "/default.jpg"}
                    alt={product.name}
                    width="50"
                    height="50"
                    style={{ borderRadius: "8px", marginRight: "16px" }}
                  />
                  <Box>
                    <Typography>
                      <strong>{product.name}</strong>
                    </Typography>
                    <Typography>Quantity: {product.quantity}</Typography>
                    <Typography>Size: {product.size}</Typography>
                    <Typography>Price: ₹{product.price}</Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default UserProfile;
