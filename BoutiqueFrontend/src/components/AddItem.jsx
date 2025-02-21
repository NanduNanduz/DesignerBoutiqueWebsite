import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const editingProduct = location.state?.product || null; // Check if editing

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestseller: false,
    images: [],
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // Prefill form when editing a product
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: editingProduct.price || "",
        category: editingProduct.category || "",
        subCategory: editingProduct.subCategory || "",
        sizes: editingProduct.sizes || [],
        bestseller: editingProduct.bestseller || false,
        images: editingProduct.image || [],
      });

      setSelectedSizes(editingProduct.sizes || []);
      setSelectedImages(editingProduct.image || []);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        selectedImages.forEach((image, index) => {
          formDataToSend.append(`image${index + 1}`, image);
        });
      } else if (key === "sizes") {
        formDataToSend.append(key, JSON.stringify(selectedSizes));
      } else {
        formDataToSend.append(key, value);
      }
    });

    const token = sessionStorage.getItem("logintoken");
    if (!token) {
      alert("Admin authentication required!");
      return;
    }

    try {
      let response;
      if (editingProduct) {
        // If editing, send a PUT request
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/products/update/${
            editingProduct._id
          }`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // If adding a new product, send a POST request
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/products/add`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      alert(response.data.message);
      navigate("/list-item");
    } catch (error) {
      alert("An error occurred while saving the product.");
    }
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#D1C7BD",
          gap: 2,
        }}
      >
        <Paper
          sx={{
            width: "50%",
            p: 4,
            background: "rgb(212, 185, 157)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {editingProduct ? "Edit Product" : "Upload Product"}
          </Typography>

          {/* File Upload */}
          <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
            <input type="file" multiple onChange={handleImageUpload} />
            {/* Show existing images if editing */}
            {editingProduct && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  mt: 2,
                }}
              >
                {formData.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="product preview"
                    width="50"
                    height="50"
                    style={{ borderRadius: "8px" }}
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* Product Name */}
          <TextField
            fullWidth
            label="Product name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Product description"
            multiline
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* Category and Subcategory */}
          <Box sx={{ display: "flex", gap: 2, mb: 2, width: "100%" }}>
            <Box sx={{ width: "50%" }}>
              <Typography sx={{ mb: 1 }}>Category</Typography>
              <Select
                fullWidth
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <MenuItem value="kurti">Kurti</MenuItem>
                <MenuItem value="lehenga">Lehenga</MenuItem>
                <MenuItem value="saree">Saree</MenuItem>
              </Select>
            </Box>

            <Box sx={{ width: "50%" }}>
              <Typography sx={{ mb: 1 }}>Sub Category</Typography>
              <Select
                fullWidth
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
              >
                <MenuItem value="cotton">Cotton</MenuItem>
                <MenuItem value="printed">Printed</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* Product Price */}
          <TextField
            label="Product Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            sx={{ width: "100%", mb: 2 }}
          />

          {/* Sizes */}
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <Button
                key={size}
                variant={
                  selectedSizes.includes(size) ? "contained" : "outlined"
                }
                sx={{
                  background: selectedSizes.includes(size)
                    ? "#CBAD8D"
                    : "#A48374",
                  color: selectedSizes.includes(size) ? "white" : "black",
                  "&:hover": { background: "#A48374", color: "white" },
                }}
                onClick={() => handleSizeToggle(size)}
              >
                {size}
              </Button>
            ))}
          </Box>

          {/* Bestseller Checkbox */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Checkbox
              checked={formData.bestseller}
              onChange={(e) =>
                setFormData({ ...formData, bestseller: e.target.checked })
              }
            />
            <Typography>Add to bestseller</Typography>
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              background: "#3A2D28",
              color: "white",
              "&:hover": { background: "#A48374" },
            }}
            onClick={handleSubmit}
          >
            {editingProduct ? "UPDATE PRODUCT" : "ADD PRODUCT"}
          </Button>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AddItem;
