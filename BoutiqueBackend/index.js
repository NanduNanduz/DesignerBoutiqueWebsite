const express = require("express");
const app = new express();

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
require("./db/connection");

const connectCloudinary = require("./db/cloudinary");

connectCloudinary()
  .then(() => console.log("Cloudinary is Ready to Use"))
  .catch((err) => console.error("Cloudinary Connection Failed:", err));

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/order", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});
