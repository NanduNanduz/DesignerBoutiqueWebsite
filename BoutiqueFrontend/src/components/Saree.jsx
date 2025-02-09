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

const sareeList = [
  {
    id: 1,
    name: "Peach Fancy Fabric Embroidered ",
    price: "₹1,299",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS80tvtYkwN9IENC2JVwOyBAoS7_5ApQXJAQ&s",
  },
  {
    id: 2,
    name: "Traditional Meenakari Silk",
    price: "₹1,599",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJSoaKY0pU26dZct8DCcj6uv3VNAJ2Q6IA6A&s",
  },
  {
    id: 3,
    name: "Red Uppada Silk Cord Work ",
    price: "₹1,899",
    image:
      "https://www.salwari.com/image/cache/product-2024/red-uppada-silk-cord-work-trendy-saree-98390-1000x1375.jpg",
  },
  {
    id: 4,
    name: "Patola Silk Multi Colour Printed",
    price: "₹999",
    image:
      "https://www.asianafashion.com/image/cache/data/patola-silk-multi-colour-printed-contemporary-saree-246912-1000x1375.jpg",
  },
  {
    id: 5,
    name: "Traditional Designer Saree ",
    price: "₹1,199",
    image:
      "https://www.sareespalace.com/image/cache/data/kanjivaram-silk-traditional-designer-saree-213320-1000x1375.jpg",
  },
  {
    id: 6,
    name: "Embroidered Navy Blue ",
    price: "₹1,000",
    image:
      "https://cdn.sareeka.com/image/cache/data2022/embroidered-navy-blue-and-yellow-silk-classic-saree-233895-1000x1375.jpg",
  },
  {
    id: 7,
    name: "Black Weaving Classic Saree ",
    price: "₹2,599",
    image:
      "https://www.sareespalace.com/image/cache/data/black-weaving-classic-saree-248414-1000x1375.jpg",
  },
  {
    id: 8,
    name: "Georgette Trendy Saree ",
    price: "₹2,199",
    image:
      "https://cdn.sareeka.com/image/cache/data2024/georgette-trendy-saree-in-green-298689-1000x1375.jpg",
  },
];

const saree = () => {
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
            <FormControlLabel control={<Checkbox />} label="Anarkali" />
            <FormControlLabel control={<Checkbox />} label="Cotton" />
            <FormControlLabel control={<Checkbox />} label="Printed" />
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
              saree
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
            {sareeList.map((saree) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={saree.id}>
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
                    image={saree.image}
                    alt={saree.name}
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
                      {saree.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {saree.price}
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

export default saree;
