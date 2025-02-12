
// import React from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Select,
//   MenuItem,
//   Checkbox,
// } from "@mui/material";
// import AdminLayout from "./AdminLayout";

// const AddItem = () => {
//   return (
//     <AdminLayout>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "100vh",
//           background: "#F5F5F5",
//         }}
//       >
//         <Paper sx={{ width: "50%", p: 4 }}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             Upload Image
//           </Typography>

//           {/* Image Upload */}
//           <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//             {[1, 2, 3, 4].map((_, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   width: 100,
//                   height: 80,
//                   background: "#EEE",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: 2,
//                 }}
//               >
//                 Upload
//               </Box>
//             ))}
//           </Box>

//           {/* Product Form */}
//           <TextField fullWidth label="Product name" sx={{ mb: 2 }} />
//           <TextField
//             fullWidth
//             label="Product description"
//             multiline
//             rows={3}
//             sx={{ mb: 2 }}
//           />

//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Select fullWidth defaultValue="Category">
//               <MenuItem value="kurti">Kurti</MenuItem>
//               <MenuItem value="lehenga">Lehenga</MenuItem>
//               <MenuItem value="saree">Saree</MenuItem>
//             </Select>

//             <Select fullWidth defaultValue="Subcategory">
//               <MenuItem value="cotton">Cotton</MenuItem>
//               <MenuItem value="printed">Printed</MenuItem>
//             </Select>

//             <TextField
//               label="Product Price"
//               type="number"
//               sx={{ width: "95%" }} // Change width from 25% to 40%
//             />
//           </Box>

//           {/* Sizes */}
//           <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
//             {["S", "M", "L", "XL", "XXL"].map((size) => (
//               <Button key={size} variant="outlined">
//                 {size}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//             <Checkbox />
//             <Typography>Add to bestseller</Typography>
//           </Box>

//           <Button variant="contained" fullWidth sx={{ mt: 2 }}>
//             ADD
//           </Button>
//         </Paper>
//       </Box>
//     </AdminLayout>
//   );
// };

// export default AddItem;



import React, { useState } from "react";
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
import axios from "axios"; // Import axios for API requests

const AddItem = () => {
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle size selection
  const handleSizeToggle = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  // Handle image upload
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
   console.log("Token Before API Request:", token); // ✅ Debugging

   if (!token) {
     alert("Admin authentication required!");
     return;
   }

   try {
     const response = await axios.post(
       "http://localhost:3000/products/add",
       formDataToSend,
       {
         headers: {
           "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${token}`,
         },
       }
     );

     console.log("Response Data:", response.data);
     alert(response.data.message);
   } catch (error) {
     console.error(
       "Error adding product:",
       error.response?.data || error.message
     );
     alert("An error occurred while adding the product.");
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
          background: "#F5F5F5",
        }}
      >
        <Paper sx={{ width: "50%", p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Upload Product
          </Typography>

          {/* Image Upload */}
          <input type="file" multiple onChange={handleImageUpload} />

          {/* Product Form */}
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

          <Box sx={{ display: "flex", gap: 2 }}>
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

            <Select
              fullWidth
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
            >
              <MenuItem value="cotton">Cotton</MenuItem>
              <MenuItem value="printed">Printed</MenuItem>
            </Select>

            <TextField
              label="Product Price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              sx={{ width: "95%" }}
            />
          </Box>

          {/* Sizes */}
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <Button
                key={size}
                variant={
                  selectedSizes.includes(size) ? "contained" : "outlined"
                }
                onClick={() => handleSizeToggle(size)}
              >
                {size}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Checkbox
              checked={formData.bestseller}
              onChange={(e) =>
                setFormData({ ...formData, bestseller: e.target.checked })
              }
            />
            <Typography>Add to bestseller</Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            ADD PRODUCT
          </Button>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AddItem;

