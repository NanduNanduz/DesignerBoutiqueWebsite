const express = require("express");
const Order = require("../model/orderData"); // Import Order model
const {verifyToken} = require("../middleware/userAuth"); // Adjust as per your middleware
const userModel = require("../model/userData"); // Import user model

const router = express.Router();


// Create a New Order
router.post("/createOrder", verifyToken, async (req, res) => {
  try {
    const { product, totalAmount, paymentStatus, paymentMethod, shippingDetails } = req.body;
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newOrder = new Order({
      userId,
      product,
      totalAmount,
      paymentMethod,
      shippingDetails,
      paymentStatus,
    });

    await newOrder.save();
    user.cartData.items = [];
    await user.save();

    res.status(200).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;

