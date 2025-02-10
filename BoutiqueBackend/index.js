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

// Connect to Cloudinary before starting the server
connectCloudinary()
  .then(() => console.log("Cloudinary is Ready to Use"))
  .catch((err) => console.error("Cloudinary Connection Failed:", err));


const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use('/products', productRoutes)



app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});
