import React, { useState } from "react";
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

const lehengaList = [
  {
    id: 1,
    name: "Red Embroidered lehenga",
    price: "₹1,299",
    image:
      "https://cdn.sareeka.com/image/cache/data2023/pink-engagement-designer-lehenga-choli-266893-1000x1375.jpg",
  },
  {
    id: 2,
    name: "Blue Printed lehenga",
    price: "₹1,599",
    image:
      "https://cdn.sareeka.com/image/cache/data2023/net-off-white-embroidered-designer-lehenga-choli-246423-1000x1375.jpg",
  },
  {
    id: 3,
    name: "Black Anarkali lehenga",
    price: "₹1,899",
    image:
      "https://cdn.sareeka.com/image/cache/data2020/multi-colour-organza-party-trendy-lehenga-choli-164147-1000x1375.jpg",
  },
  {
    id: 4,
    name: "Yellow Cotton lehenga",
    price: "₹999",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAl-srejUEQTv3IxfAJhcQgJErwpaPtagqKg&s",
  },
  {
    id: 5,
    name: "Net Anarkali Salwar",
    price: "₹1,199",
    image:
      "https://www.salwari.com/image/cache/product-2024/red-net-embroidered-readymade-lehenga-choli-96600-1000x1375.jpg",
  },
  {
    id: 6,
    name: "Blue Foil Print lehengas",
    price: "₹1,000",
    image:
      "https://kajols.com/cdn/shop/products/digital-print-engagement-readymade-lehenga-choli-248479-1000x1375.jpg?v=1675898388",
  },
  {
    id: 7,
    name: "Cotton lehenga",
    price: "₹2,599",
    image:
      "https://www.salwari.com/image/cache/product-2023/digital-print-off-white-cotton-designer-lehenga-choli-86179-1000x1375.jpg",
  },
  {
    id: 8,
    name: "Anarkali Suit Art Silk",
    price: "₹2,199",
    image:
      "https://www.sareespalace.com/image/cache/data-2024/green-floral-patterns-trendy-lehenga-choli-304967-1000x1375.jpg",
  },
];

const lehenga = () => {
  const [sort, setSort] = useState("relevant");

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

          {/* Categories */}
          {/* <Typography variant="h6" mb={1}>
          Categories
        </Typography> */}
          {/* <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Women" />
          <FormControlLabel control={<Checkbox />} label="Men" />
          <FormControlLabel control={<Checkbox />} label="Kids" />
        </FormGroup> */}

          {/* Type */}
          <Typography variant="h6" mt={4} sx={{ color: "#A48374" }}>
            Type
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Cotton" />
            <FormControlLabel control={<Checkbox />} label="Printed" />
            <FormControlLabel control={<Checkbox />} label="Embroidered" />
          </FormGroup>
        </Box>

        {/* Main Content - Collection */}
        <Box flex={1}>
          {/* Header with Sorting */}
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
              LEHENGA
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
            {lehengaList.map((lehenga) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={lehenga.id}>
                <Card
                  sx={{
                    height: "100%", // Ensures all cards are the same height
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: 3,
                    borderRadius: 3,
                    overflow: "hidden", // Prevents overflow issues
                  }}
                >
                  <CardMedia
                    component="img"
                    image={lehenga.image}
                    alt={lehenga.name}
                    sx={{
                      height: "250px", // Fixed height for uniformity
                      width: "100%",
                      objectFit: "scale-down", // Show full image without cropping
                      backgroundColor: "#A48374",
                      borderRadius: 3, // Optional: Adds a background to avoid blank spaces
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
                      {lehenga.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {lehenga.price}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
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

export default lehenga;
