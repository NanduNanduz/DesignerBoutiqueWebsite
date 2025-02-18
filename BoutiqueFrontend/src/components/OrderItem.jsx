// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   MenuItem,
//   Select,
//   FormControl,
// } from "@mui/material";
// import AdminLayout from "./AdminLayout";

// const initialOrders = [
//   {
//     id: 1,
//     image: "/images/item1.jpg",
//     product: "Women Zip-Front Relaxed Fit Jacket",
//     quantity: 1,
//     size: "L",
//     price: 88,
//     customer: "bbb bbb",
//     address: "gali.no-3, delhi, delhi, india, 100982",
//     method: "COD",
//     paymentStatus: "Pending",
//     date: "2/11/2025",
//     status: "Order Placed",
//   },
//   {
//     id: 2,
//     image: "/images/item2.jpg",
//     product: "Men Round Neck Pure Cotton T-shirt",
//     quantity: 1,
//     size: "XL",
//     price: 74,
//     customer: "Aswin A",
//     address: "Erode, perundhurai, thudupathi, Thuduppathi, 638057, India",
//     method: "COD",
//     paymentStatus: "Pending",
//     date: "2/11/2025",
//     status: "Order Placed",
//   },
//   {
//     id: 3,
//     image: "/images/item3.jpg",
//     product: "Boy Round Neck Pure Cotton T-shirt",
//     quantity: 1,
//     size: "M",
//     price: 70,
//     customer: "Aswin A",
//     address: "Erode, perundhurai, thudupathi, Thuduppathi, 638057, India",
//     method: "COD",
//     paymentStatus: "Pending",
//     date: "2/11/2025",
//     status: "Order Placed",
//   },
// ];

// const Orders = () => {
//   const [orders, setOrders] = useState(initialOrders);


//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/orders/updateOrderStatus/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("logintoken")}`,
//           },
//           body: JSON.stringify({ orderStatus: newStatus }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update order status");
//       }

//       const data = await response.json();
//       console.log("Order updated:", data);

//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === id ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (error) {
//       console.error("Error updating order status:", error);
//     }
//   };


//   return (
//     <AdminLayout>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Order Page
//         </Typography>

//         {orders.map((order) => (
//           <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
//             <Box display="flex" alignItems="center">
//               {/* Product Image */}
//               <img
//                 src={order.image}
//                 alt={order.product}
//                 width="50"
//                 height="50"
//                 style={{ borderRadius: "8px", marginRight: "16px" }}
//               />

//               <Box flexGrow={1}>
//                 {/* Product & Customer Details */}
//                 <Typography>
//                   <strong>{order.product}</strong> x {order.quantity}{" "}
//                   {order.size}
//                 </Typography>
//                 <Typography>{order.customer}</Typography>
//                 <Typography sx={{ fontSize: "14px", color: "gray" }}>
//                   {order.address}
//                 </Typography>

//                 {/* Order Details */}
//                 <Typography>Items: {order.quantity}</Typography>
//                 <Typography>${order.price}</Typography>
//                 <Typography>Method: {order.method}</Typography>
//                 <Typography>Payment: {order.paymentStatus}</Typography>
//                 <Typography>Date: {order.date}</Typography>
//               </Box>

//               {/* Order Status Dropdown */}
//               <FormControl variant="outlined" sx={{ minWidth: 150 }}>
//                 <Select
//                   value={order.status}
//                   onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                 >
//                   <MenuItem value="Order Placed">Order Placed</MenuItem>
//                   <MenuItem value="Packing">Packing</MenuItem>
//                   <MenuItem value="Shipped">Shipped</MenuItem>
//                   <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
//                   <MenuItem value="Delivered">Delivered</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           </Paper>
//         ))}
//       </Box>
//     </AdminLayout>
//   );
// };

// export default Orders;


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import AdminLayout from "./AdminLayout";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/orderInfo`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("logintoken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        console.log("Orders fetched:", data);

        // Format orders to match frontend structure
        const formattedOrders = data.map((order) => ({
          id: order._id,
          image: order.product[0]?.image || "/default.jpg",
          product: order.product[0]?.name || "Unknown Product",
          quantity: order.product[0]?.quantity || 1,
          size: order.product[0]?.size || "N/A",
          price: order.totalAmount,
          customer: order.userId?.name || "Unknown Customer",
          address: `${order.shippingDetails.address}, ${order.shippingDetails.city}, ${order.shippingDetails.state}, ${order.shippingDetails.zip}, ${order.shippingDetails.country}`,
          method: order.paymentMethod.toUpperCase(),
          paymentStatus: order.paymentStatus,
          date: new Date(order.createdAt).toLocaleDateString(),
          status: order.orderStatus,
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/updateOrderStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("logintoken")}`,
          },
          body: JSON.stringify({ orderStatus: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const data = await response.json();
      console.log("Order updated:", data);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Order Page
        </Typography>

        {orders.map((order) => (
          <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
            <Box display="flex" alignItems="center">
              {/* Product Image */}
              <img
                src={order.image}
                alt={order.product}
                width="50"
                height="50"
                style={{ borderRadius: "8px", marginRight: "16px" }}
              />

              <Box flexGrow={1}>
                {/* Product & Customer Details */}
                <Typography>
                  <strong>{order.product}</strong> x {order.quantity}{" "}
                  {order.size}
                </Typography>
                <Typography>{order.customer}</Typography>
                <Typography sx={{ fontSize: "14px", color: "gray" }}>
                  {order.address}
                </Typography>

                {/* Order Details */}
                <Typography>Items: {order.quantity}</Typography>
                <Typography>${order.price}</Typography>
                <Typography>Method: {order.method}</Typography>
                <Typography>Payment: {order.paymentStatus}</Typography>
                <Typography>Date: {order.date}</Typography>
              </Box>

              {/* Order Status Dropdown */}
              <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <Select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        ))}
      </Box>
    </AdminLayout>
  );
};

export default Orders;

