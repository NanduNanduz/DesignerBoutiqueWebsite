// //for admin authentication 
// //here we add those api need the admin permission 


// const jwt = require("jsonwebtoken");

// const adminAuth = async (req, res, next) => {
//   try {
//     console.log("Incoming Headers:", req.headers); // Debugging

//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res
//         .status(401)
//         .json({
//           success: false,
//           message: "Not Authorized. Please log in again.",
//         });
//     }

//     // Extract the token
//     const token = authHeader.split(" ")[1];
//     console.log("Extracted Token:", token); // Debugging

//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", token_decode); // Debugging

//     // Check if the decoded token contains the admin email
//     if (!token_decode.email || token_decode.email !== process.env.ADMIN_EMAIL) {
//       return res.status(403).json({
//         success: false,
//         message: "Access Denied. Admin privileges required.",
//       });
//     }

//     req.admin = token_decode;
//     next(); // Proceed to the next middleware
//   } catch (error) {
//     console.log("JWT Verification Error:", error); // Debugging
//     res
//       .status(403)
//       .json({ success: false, message: "Invalid or expired token" });
//   }
// };

// module.exports = adminAuth;






// const jwt = require("jsonwebtoken");

// const adminAuth = async (req, res, next) => {
//   try {
//     console.log("Incoming Headers:", req.headers);
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res
//         .status(401)
//         .json({
//           success: false,
//           message: "Not Authorized. Please log in again.",
//         });
//     }

//     const token = authHeader.split(" ")[1];
//     console.log("Extracted Token:", token);

//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", token_decode);

//     if (!token_decode.email || token_decode.email !== process.env.ADMIN_EMAIL) {
//       return res
//         .status(403)
//         .json({
//           success: false,
//           message: "Access Denied. Admin privileges required.",
//         });
//     }

//     req.admin = token_decode;
//     next();
//   } catch (error) {
//     console.log("JWT Verification Error:", error);
//     res
//       .status(403)
//       .json({ success: false, message: "Invalid or expired token" });
//   }
// };

// module.exports = adminAuth;




const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    console.log("Incoming Headers:", req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please log in again.",
      });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", token_decode);

    // ✅ Check if user has admin role instead of checking email
    if (token_decode.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Admin privileges required.",
      });
    }

    req.admin = token_decode;
    next(); // Proceed to the next middleware
  } catch (error) {
    console.log("JWT Verification Error:", error);
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = adminAuth;
