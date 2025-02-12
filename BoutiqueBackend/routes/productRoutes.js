const express = require("express");

const router = express.Router();

router.use(express.json());

const productModel = require("../model/productData");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const upload = require('../middleware/multer');

const { v2: cloudinary } = require("cloudinary");

const adminAuth = require('../middleware/adminAuth')



//--------------add product--------------------
// router.post(
//   "/add",adminAuth,
//   upload.fields([
//     { name: "image1", maxCount: 1 },
//     { name: "image2", maxCount: 1 },
//     { name: "image3", maxCount: 1 },
//     { name: "image4", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       // Debugging - Log full request body
//       console.log("Received Request Body:", req.body);

//       const {
//         name,
//         description,
//         price,
//         category,
//         subCategory,
//         sizes,
//         bestseller,
//       } = req.body;

//       if (!subCategory) {
//         return res.json({
//           success: false,
//           message: "subCategory is required.",
//         });
//       }

//       console.log("Raw sizes received:", sizes); // Debugging log

//       //  Convert sizes into an array
//       let parsedSizes;
//       try {
//         if (Array.isArray(sizes)) {
//           parsedSizes = sizes; // If already an array, use it
//         } else {
//           parsedSizes = JSON.parse(sizes); // Try parsing JSON
//         }
//       } catch (err) {
//         // If JSON parsing fails, attempt to split by comma
//         parsedSizes = sizes ? sizes.split(",").map((size) => size.trim()) : [];
//       }

//       // Check if parsedSizes is an array
//       if (!Array.isArray(parsedSizes)) {
//         return res.json({
//           success: false,
//           message: "Invalid sizes format. It should be a JSON array.",
//         });
//       }

//       //  Get uploaded images
//       const image1 = req.files.image1 && req.files.image1[0];
//       const image2 = req.files.image2 && req.files.image2[0];
//       const image3 = req.files.image3 && req.files.image3[0];
//       const image4 = req.files.image4 && req.files.image4[0];

//       const images = [image1, image2, image3, image4].filter(
//         (item) => item !== undefined
//       );

//       //  Upload images to Cloudinary
//       let imageUrls = await Promise.all(
//         images.map(async (item) => {
//           let result = await cloudinary.uploader.upload(item.path, {
//             resource_type: "image",
//           });
//           return result.secure_url;
//         })
//       );

//       //  Save to database
//       const productData = {
//         name,
//         description,
//         category,
//         price: Number(price),
//         subCategory,
//         bestseller: bestseller === "true",
//         sizes: parsedSizes,
//         image: imageUrls,
//         date: Date.now(),
//       };

//       console.log("Final Product Data:", productData); // Debugging log

//       const product = new productModel(productData);
//       await product.save();

//       res.json({ success: true, message: "Product Added" });
//     } catch (error) {
//       console.log("Error:", error.message);
//       res.json({ success: false, message: error.message });
//     }
//   }
// );


router.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("Received Request Body:", req.body);
      console.log("Received Files:", req.files);

      const {
        name,
        description,
        price,
        category,
        subCategory,
        sizes,
        bestseller,
      } = req.body;

      if (!subCategory) {
        return res.json({
          success: false,
          message: "subCategory is required.",
        });
      }

      let parsedSizes;
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (err) {
        parsedSizes = sizes ? sizes.split(",").map((size) => size.trim()) : [];
      }

      console.log("Parsed Sizes:", parsedSizes);

      // Get uploaded images
      const images = ["image1", "image2", "image3", "image4"]
        .map((key) => (req.files[key] ? req.files[key][0] : null))
        .filter(Boolean);

      console.log("Images to Upload:", images);

      let imageUrls = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );

      const productData = {
        name,
        description,
        category,
        price: Number(price),
        subCategory,
        bestseller: bestseller === "true",
        sizes: parsedSizes,
        image: imageUrls,
        date: Date.now(),
      };

      console.log("Final Product Data:", productData);

      const product = new productModel(productData);
      await product.save();

      res.json({ success: true, message: "Product Added" });
    } catch (error) {
      console.log("Error in /add:", error.message);
      res.json({ success: false, message: error.message });
    }
  }
);



// //list product
// router.get('/list', async(req,res)=>{
//   try {
//     const products = await productModel.find({});
//     res.json({success:true,products})
    
//   } catch (error) {
//     console.log(error)
//     res.json({success: false, message: error.message})
//   }

// })




// List products with optional category filtering
router.get('/list', async (req, res) => {
  try {
    const { category } = req.query; // Extract category from request query

    let filter = {};
    if (category) {
      filter.category = new RegExp(`^${category}$`, "i"); // Case-insensitive search
    }

    const products = await productModel.find(filter);
    res.json({ success: true, products });

  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});



//single product info
router.post('/single', async(req,res)=>{
  try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    res.json({success:true, product})
  } catch (error) {

     console.log(error);
     res.json({ success: false, message: error.message });
    
  }

})

router.get("/single/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});



//remove product
router.post("/remove",adminAuth, async (req, res) => {
  try {
    const { id } = req.body; // Extract ID from request body

    if (!id) {
      return res.json({ success: false, message: "Product ID is required" });
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log("Error in /remove:", error);
    res.json({ success: false, message: error.message });
  }
});




module.exports = router;




