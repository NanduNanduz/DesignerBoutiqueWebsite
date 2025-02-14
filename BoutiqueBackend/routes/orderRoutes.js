const express = require("express");
const userOrderModel = require("../model/orderData");
const userModel = require("../model/userData");
const router = express.Router();



const { verifyToken } = require("../middleware/userAuth");


// Create a new order
router.post("/createOrder", verifyToken, async (req, res) => {
  try {
    const { userId, paymentMethod, totalAmount, shippingDetails, products } = req.body;

    if (!userId || !paymentMethod || !totalAmount || !shippingDetails || !products) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure shipping details are correctly structured
    if (
      !shippingDetails.phone ||
      !shippingDetails.country ||
      !shippingDetails.zip ||
      !shippingDetails.state ||
      !shippingDetails.city ||
      !shippingDetails.address
    ) {
      return res.status(400).json({ error: "Missing shipping details" });
    }

    // Ensure product details are correctly structured
    if (!products.length || !products[0].productId) {
      return res.status(400).json({ error: "Invalid product details" });
    }

    // Create a new order with correct structure
    const newOrder = new userOrderModel({
      userId,
      paymentMethod,
      totalAmount,
      shippingDetails, // Should include phone, country, zip, state, city, address
      products, // Should be an array of objects { productId, qty, price }
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Create Order
router.post("/placeorder", verifyToken, async (req, res) => {
  try {
    const { products, totalAmount, paymentMethod, shippingDetails } = req.body;
    const userId = req.user.id;

    // Create a new order
    const newOrder = new userOrderModel({
      userId,
      products,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
      shippingDetails,
      orderStatus: "Pending",
    });

    await newOrder.save();

    // Clear the cart after order is placed
    const user = await userModel.findById(userId);
    user.cartData.items = [];
    await user.save();

    res.status(201).json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




// router.get("/orderInfo", verifyToken, async (req, res) => {
//   try {
//     const orders = await userOrderModel.find()
//       .populate("userId", "name email")
//       .populate("products.productId", "name image");
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });



router.get("/orderInfo", async (req, res) => {
  try {
    const orders = await userOrderModel.find()
      .populate("userId", "name email") // Fetch user name & email
      .populate("products.productId", "name image"); // Fetch product name & image

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});


module.exports = router;
