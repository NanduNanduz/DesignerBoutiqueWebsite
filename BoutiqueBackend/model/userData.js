const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  name: String,
  price: Number,
  size: String,
  image: String,
  quantity: { type: Number, default: 1 },
});

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String },
    cartData: {
      items: [cartItemSchema], // Store cart items as an array
    },
  },
  { minimize: false }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
