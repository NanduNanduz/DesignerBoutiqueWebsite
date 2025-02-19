const express = require("express");
const Order = require("../model/orderData"); 
const {verifyToken} = require("../middleware/userAuth"); 
const userModel = require("../model/userData");
const mongoose = require("mongoose");


const router = express.Router();


// Create a New Order
router.post("/createOrder", verifyToken, async (req, res) => {
  try {
    const {
      products,
      totalAmount,
      paymentStatus,
      paymentMethod,
      shippingDetails,
    } = req.body;
    const userId = req.user.id;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ message: "No products found in the order" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newOrder = new Order({
      userId,
      products, // ✅ Ensure products are being stored
      totalAmount,
      paymentMethod,
      shippingDetails,
      paymentStatus,
    });

    await newOrder.save();
    user.cartData.items = [];
    await user.save();

    res
      .status(200)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("🚨 Error creating order:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});





router.get("/allOrders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




router.put("/updateOrderStatus/:id", verifyToken, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/user-orders", verifyToken, async (req, res) => {
  try {
    console.log("User ID from Token:", req.user.id);

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const orders = await Order.find({ userId }).populate("products.productId");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;

