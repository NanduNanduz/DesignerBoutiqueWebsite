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

//   const handleStatusChange = (id, newStatus) => {
//     const updatedOrders = orders.map((order) =>
//       order.id === id ? { ...order, status: newStatus } : order
//     );
//     setOrders(updatedOrders);
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

import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/order/orderInfo", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("logintoken")}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="container">
      <h2>Admin Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Products</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              {/* Handle case when userId is null */}
              <td>
                {order.userId
                  ? `${order.userId.name} (${order.userId.email})`
                  : "Guest User"}
              </td>

              {/* Check if products exist before mapping */}
              <td>
                {Array.isArray(order.products) && order.products.length > 0 ? (
                  order.products.map((item, index) => (
                    <div key={index}>
                      {item.productId && item.productId.image && (
                        <img
                          src={item.productId.image}
                          alt={item.productId.name || "Product"}
                          width="50"
                        />
                      )}
                      {item.productId?.name || "Unknown Product"} x{" "}
                      {item.quantity}
                    </div>
                  ))
                ) : (
                  <span>No products</span>
                )}
              </td>

              <td>${order.totalAmount?.toFixed(2) || "0.00"}</td>
              <td>
                {order.paymentMethod || "N/A"} (
                {order.paymentStatus || "Pending"})
              </td>
              <td>{order.orderStatus || "Processing"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
