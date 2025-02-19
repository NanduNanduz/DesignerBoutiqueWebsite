// import React, { useEffect, useState } from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import { jwtDecode } from "jwt-decode";


// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const token = sessionStorage.getItem("logintoken");

    
// if (token) {
//   try {
//     const decodedToken = jwtDecode(token);
//     setUser(decodedToken);
//   } catch (error) {
//     console.error("Error decoding token:", error);
//   }
// }

//     // Fetch user-specific orders from API
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/order/user-orders`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch orders");
//         }

//         const data = await response.json();
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     if (token) {
//       fetchOrders();
//     }
//   }, []);

//   if (!user) {
//     return (
//       <Typography color="red" mt={4}>
//         No user found. Please log in.
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" fontWeight="bold" color="red" gutterBottom>
//         Welcome, {user.name}
//       </Typography>
//       <Typography>Email: {user.email}</Typography>

//       <Typography variant="h6" fontWeight="bold" mt={3}>
//         Your Orders
//       </Typography>

//       {orders.length === 0 ? (
//         <Typography>No orders found.</Typography>
//       ) : (
//         orders.map((order) => (
//           <Paper key={order._id} sx={{ p: 2, mb: 2 }}>
//             <Typography>
//               <strong>Order ID:</strong> {order._id}
//             </Typography>
//             <Typography>
//               <strong>Total Price:</strong> ₹{order.totalAmount}
//             </Typography>
//             <Typography>
//               <strong>Payment Method:</strong>{" "}
//               {order.paymentMethod.toUpperCase()}
//             </Typography>
//             <Typography>
//               <strong>Payment Status:</strong> {order.paymentStatus}
//             </Typography>
//             <Typography>
//               <strong>Order Status:</strong> {order.orderStatus}
//             </Typography>
//             <Typography>
//               <strong>Order Date:</strong>{" "}
//               {new Date(order.createdAt).toLocaleDateString()}
//             </Typography>

//             <Typography variant="h6" mt={2}>
//               Product:
//             </Typography>
//             {order.products.map((product, index) => (
//               <Paper key={index} sx={{ p: 2, mt: 1 }}>
//                 <Box display="flex" alignItems="center">
//                   <img
//                     src={product.image || "/default.jpg"}
//                     alt={product.name}
//                     width="50"
//                     height="50"
//                     style={{ borderRadius: "8px", marginRight: "16px" }}
//                   />
//                   <Box>
//                     <Typography>
//                       <strong>{product.name}</strong>
//                     </Typography>
//                     <Typography>Quantity: {product.quantity}</Typography>
//                     <Typography>Size: {product.size}</Typography>
//                     <Typography>Price: ₹{product.price}</Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             ))}
//           </Paper>
//         ))
//       )}
//     </Box>
//   );
// };

// export default UserProfile;



import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, Divider } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

useEffect(() => {
  const token = sessionStorage.getItem("logintoken");

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders with token:", token);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/user-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch orders. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Orders Data:", data); // Debugging

      setOrders(data);

      // ✅ Extract the user's name from the first order (if orders exist)
      if (data.length > 0 && data[0].userId) {
        setUser({ name: data[0].userId.name, email: data[0].userId.email });
      }
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
      <Typography color="error" mt={4} textAlign="center">
        No user found. Please log in.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "800px",
        mx: "auto",
        backgroundColor: "#F7F1EE",
        borderRadius: "12px",
        boxShadow: 3,
        mt:'2%'
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar
          sx={{ bgcolor: "#3A2D28", color: "white", width: 56, height: 56 }}
        >
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold" color="#3A2D28">
            Welcome, {user.name}
          </Typography>
          <Typography color="#A48374">Email: {user.email}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, bgcolor: "#CBAD8D" }} />

      <Typography variant="h6" fontWeight="bold" color="#3A2D28" mb={2}>
        Your Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography color="#A48374">No orders found.</Typography>
      ) : (
        orders.map((order) => (
          <Paper
            key={order._id}
            sx={{ p: 3, mb: 2, backgroundColor: "#D1C7BD" }}
          >
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

            <Divider sx={{ my: 2, bgcolor: "#CBAD8D" }} />
            <Typography variant="h6" color="#3A2D28">
              Products:
            </Typography>
            {order.products.map((product, index) => (
              <Paper
                key={index}
                sx={{ p: 2, mt: 1, backgroundColor: "#F7F1EE" }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <img
                    src={product.image || "/default.jpg"}
                    alt={product.name}
                    width="60"
                    height="60"
                    style={{ borderRadius: "8px" }}
                  />
                  <Box>
                    <Typography fontWeight="bold" color="#3A2D28">
                      {product.name}
                    </Typography>
                    <Typography color="#A48374">
                      Quantity: {product.quantity}
                    </Typography>
                    <Typography color="#A48374">
                      Size: {product.size}
                    </Typography>
                    <Typography color="#A48374">
                      Price: ₹{product.price}
                    </Typography>
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
