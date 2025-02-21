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
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import axios from "axios";

const ListItems = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/list`)
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
      const token = sessionStorage.getItem("logintoken");
      console.log("Token being sent:", token);
      if (!token) {
        console.error("No token found. Make sure admin is logged in.");
        return;
      }
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/remove`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleEdit = (product) => {
    navigate("/add-item", { state: { product } }); // Navigate to AddItem.jsx with product data
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          style={{ color: "#A48374" }}
        >
          All Products List
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#CBAD8D" }}>
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
                <TableRow
                  key={product._id}
                  style={{ backgroundColor: "#D1C7BD" }}
                >
                  <TableCell>
                    <img
                      src={product.image[0]}
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
                      onClick={() => handleEdit(product)} // Handle edit
                    >
                      <EditIcon />
                    </IconButton>
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
