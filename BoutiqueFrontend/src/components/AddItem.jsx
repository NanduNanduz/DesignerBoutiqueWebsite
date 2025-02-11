
import React from "react";
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
import AdminLayout from "./AdminLayout";

const AddItem = () => {
  return (
    <AdminLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#F5F5F5",
        }}
      >
        <Paper sx={{ width: "50%", p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Upload Image
          </Typography>

          {/* Image Upload */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {[1, 2, 3, 4].map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 100,
                  height: 80,
                  background: "#EEE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                }}
              >
                Upload
              </Box>
            ))}
          </Box>

          {/* Product Form */}
          <TextField fullWidth label="Product name" sx={{ mb: 2 }} />
          <TextField
            fullWidth
            label="Product description"
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Select fullWidth defaultValue="Category">
              <MenuItem value="kurti">Kurti</MenuItem>
              <MenuItem value="lehenga">Lehenga</MenuItem>
              <MenuItem value="saree">Saree</MenuItem>
            </Select>

            <Select fullWidth defaultValue="Subcategory">
              <MenuItem value="cotton">Cotton</MenuItem>
              <MenuItem value="printed">Printed</MenuItem>
            </Select>

            <TextField
              label="Product Price"
              type="number"
              sx={{ width: "95%" }} // Change width from 25% to 40%
            />
          </Box>

          {/* Sizes */}
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <Button key={size} variant="outlined">
                {size}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Checkbox />
            <Typography>Add to bestseller</Typography>
          </Box>

          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            ADD
          </Button>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AddItem;

