const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
});

const upload = multer({storage});

module.exports = upload;



// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, ""); // Ensure "uploads" folder exists
//   },
//   filename: function (req, file, callback) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     callback(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });


// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Define the upload path
// const uploadPath = path.join(__dirname, "../src/assets/");

// // Ensure the folder exists
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if it doesn't exist
// }

// // Define storage with custom path
// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, uploadPath);
//   },
//   filename: function (req, file, callback) {
//     callback(null, Date.now() + "-" + file.originalname);
//   },
// });

// // Initialize Multer with storage
// const upload = multer({ storage });

// module.exports = upload;
