
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminLayout from "./AdminLayout";
import axios from "axios";

const ListItems = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3000/products/list") // Adjust API URL
      .then((response) => {
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          console.error("Error fetching products:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) {
    return;
  }

  try {
    const token = sessionStorage.getItem("logintoken"); // Retrieve token
    console.log("Token being sent:", token); // Debugging

    if (!token) {
      console.error("No token found. Make sure admin is logged in.");
      return;
    }

    const response = await axios.delete(
      "http://localhost:3000/products/remove",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
        data: { id }, // DELETE requests require 'data'
      }
    );

    if (response.data.success) {
      setProducts(products.filter((product) => product._id !== id));
    } else {
      console.error("Error deleting product:", response.data.message);
    }
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error);
  }
};




  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          All Products List
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Image</b>
                </TableCell>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Category</b>
                </TableCell>
                <TableCell>
                  <b>Price</b>
                </TableCell>
                <TableCell>
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={product.image[0]} // Assuming image is stored as an array
                      alt={product.name}
                      width="50"
                      height="50"
                      style={{ borderRadius: "8px" }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ color: "#A48374" }}
                
                      onClick={() => handleDelete(product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AdminLayout>
  );
};

export default ListItems;
