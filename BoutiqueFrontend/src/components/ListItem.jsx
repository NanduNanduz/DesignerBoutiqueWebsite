import React from "react";
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

const products = [
  {
    id: 1,
    image: "/images/item1.jpg",
    name: "Kid Tapered Slim Fit Trouser",
    category: "Kids",
    price: 38,
  },
  {
    id: 2,
    image: "/images/item2.jpg",
    name: "Men Round Neck Pure Cotton T-shirt",
    category: "Men",
    price: 64,
  },
  {
    id: 3,
    image: "/images/item3.jpg",
    name: "Boy Round Neck Pure Cotton T-shirt",
    category: "Kids",
    price: 60,
  },
  {
    id: 4,
    image: "/images/item4.jpg",
    name: "Women Zip-Front Relaxed Fit Jacket",
    category: "Women",
    price: 74,
  },
];

const ListItems = () => {
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
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      width="50"
                      height="50"
                      style={{ borderRadius: "8px" }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <IconButton color="error">
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
