const express = require("express");

const router = express.Router();

router.use(express.json());

const userModel = require("../model/userData");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const validator = require("validator")



const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}


//User Registration
router.post('/register',async(req,res)=>{
  try {
    const { name, email, password } = req.body;
    //checking user already exist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Creating user with hashedPassword, email, and name

    const newUser  = new userModel({
      name,
      email,
      password:hashedPassword,
      role: "user",
    })

    // save to db 
    const user = await newUser.save()
    //after save provide one token (using the id of user) using that token user can login in the application
    const token = createToken(user._id)

    res.json({success:true,token})


  } catch (error) {

    console.log(error);
    res.json({success:false,message:error.message})
    
  }

} )


// //User Login 
// router.post('/login',async(req,res)=>{
//   try {
    
//     const {email,password} = req.body;
//     const user = await userModel.findOne({email});
//     if(!user){
//       return res.json({ success: false, message: "User doesn't exists" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password)
//     // if password also match then generate a token and send to the user
//     if(isMatch){
//       const token  = createToken(user._id)
//       res.json({success:true,token})
//     }
//     else{
//       res.json({success:false, message:'Invalid credentials'})
//     }
//   }
//    catch (error) {
//      console.log(error);
//      res.json({ success: false, message: error.message });
//   }
// })




router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT payload including the role
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role, // ✅ Include role in token
    };

    // Generate token with a secret key
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token and role in the response
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
      role: user.role, // ✅ Send role to frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




// Admin Login
router.post('/admin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generate token with email in the payload
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});


module.exports = router;
