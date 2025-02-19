
const express = require("express");
const router = express.Router();


const userModel = require("../model/userData");
const productModel = require("../model/productData");
const Order = require("../model/orderData");
const {verifyToken}  = require("../middleware/userAuth");

// Add to Cart
router.post("/addToCart", verifyToken, async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than zero." });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available." });
    }

    if (!user.cartData) {
      user.cartData = { items: [] };
    }

    const existingItemIndex = user.cartData.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItemIndex !== -1) {
      user.cartData.items[existingItemIndex].quantity += quantity;
    } else {
      user.cartData.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        size: size,
        image: product.image[0],
        quantity: quantity,
      });
    }

    await user.save();
    res
      .status(200)
      .json({
        message: "Product added to cart successfully",
        cart: user.cartData.items,
      });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get User Cart
router.get("/cartlist", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
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

// Remove an Item from Cart
router.delete("/deletecart/:itemId", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cartData.items = user.cartData.items.filter(
      (item) => item._id.toString() !== itemId
    );
    await user.save();
    res
      .status(200)
      .json({
        message: "Item removed successfully",
        cart: user.cartData.items,
      });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Clear Cart
router.delete("/clearcart", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cartData.items = [];
    await user.save();
    res.status(200).json({ message: "Cart cleared after payment" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;