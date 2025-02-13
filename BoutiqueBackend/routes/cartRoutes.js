const express = require("express");
const router = express.Router();

const userModel = require("../model/userData");
const productModel = require("../model/productData");

const { verifyToken } = require("../middleware/userAuth"); // Ensure authentication

// Add to Cart API Route
router.post("/addToCart", verifyToken, async (req, res) => {
  try {
    const { productId, size, quantity } = req.body; // Get product details from frontend
    const userId = req.user.id; // Extract user ID from token

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if the product already exists in the cart
    const existingItemIndex = user.cartData.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItemIndex !== -1) {
      // If product exists, update the quantity
      user.cartData.items[existingItemIndex].quantity += quantity;
    } else {
      // If not, add a new item
      user.cartData.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        size: size,
        image: product.image[0],
        quantity: quantity,
      });
    }

    await user.save(); // Save the updated cart
    res
      .status(200)
      .json({
        message: "Product added to cart successfully",
        cart: user.cartData,
      });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





// Get user cart
router.get("/cartlist", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware sets req.user
    const user = await userModel
      .findById(userId)
      .populate("cartData.items.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.cartData.items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});




// Remove an item from cart
router.delete("/deletecart/:itemId", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Filter out the item to remove it
    user.cartData.items = user.cartData.items.filter(
      (item) => item._id.toString() !== itemId
    );

    await user.save();
    res.status(200).json({ message: "Item removed successfully", cart: user.cartData.items });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;

