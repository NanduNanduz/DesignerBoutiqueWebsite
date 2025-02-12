const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
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

    // Attach user information to the request object
    req.user = token_decode;
    next(); // Proceed to the next middleware
  } catch (error) {
    console.log("JWT Verification Error:", error);
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
