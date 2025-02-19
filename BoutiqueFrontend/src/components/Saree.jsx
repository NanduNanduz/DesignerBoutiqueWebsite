


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const Saree = () => {
  const [sareeList, setSareeList] = useState([]);
  const [sort, setSort] = useState("relevant");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/list?category=saree`) // Fetch saree products
      .then((response) => setSareeList(response.data.products))
      .catch((error) => console.error("Error fetching sarees:", error));
  }, []);

    // Sorting logic
  const sortedSarees = [...sareeList].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    return 0; // "Relevant" keeps original order
  });


  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        maxWidth="1200px"
        mx="auto"
        py={4}
        px={3}
        gap={3}
      >
        {/* Sidebar Filters */}
        <Box width="100px">
          <Typography
            variant="h5"
            fontWeight="bold"
            mt={8}
            sx={{ color: "#A48374" }}
          >
            Filters
          </Typography>
          <Typography variant="h6" mt={4} sx={{ color: "#A48374" }}>
            Type
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Fabric" />
            <FormControlLabel control={<Checkbox />} label="Georgette" />
            <FormControlLabel control={<Checkbox />} label="Silk" />
          </FormGroup>
        </Box>

        {/* Main Content - Collection */}
        <Box flex={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                margin: "0 auto",
                display: "block",
                textAlign: "center",
                color: "#A48374",
              }}
            >
              SAREE
            </Typography>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              variant="outlined"
              size="small"
            >
              <MenuItem value="relevant">Sort by: Relevant</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
            </Select>
          </Box>

          {/* Product Grid Layout */}
          <Grid container spacing={3} justifyContent="center">
            {sortedSarees.map((saree) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={saree._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: 3,
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      Array.isArray(saree.image) ? saree.image[0] : saree.image
                    }
                    alt={saree.name}
                    sx={{
                      height: "250px",
                      width: "100%",
                      objectFit: "scale-down",
                      backgroundColor: "#A48374",
                      borderRadius: 3,
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {saree.name}
                    </Typography>
                    <Typography color="text.secondary">
                      ₹{saree.price}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/product/${saree._id}`}
                    sx={{
                      width: "100%",
                      bgcolor: "#A48374",
                      "&:hover": { bgcolor: "#333" },
                    }}
                  >
                    Buy Now
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Saree;

