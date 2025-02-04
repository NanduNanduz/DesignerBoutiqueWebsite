// // cloudinary cloud storage where we will store the images
// //for to configure this  cloudinary  - get the api from the cloudinary website 

// const { v2: cloudinary } = require("cloudinary");

// const connectCloudinary = async()=>{
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_SECRET_KEY
//     });

// }


// export default connectCloudinary ;


// cloudinary cloud storage where we will store the images
// To configure Cloudinary - get the API from the Cloudinary website

const { v2: cloudinary } = require("cloudinary");

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });

  console.log("✅ Cloudinary Connected Successfully!");
};

module.exports = connectCloudinary;
