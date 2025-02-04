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

// router.post("/adduser", async (req, res) => {
//   const { name, email, phoneNumber, address, password } = req.body;

//   try {
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     //  Hash the password before saving
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userModel({
//       name,
//       email,
//       phoneNumber,
//       address,
//       password: hashedPassword, // Store the hashed password
//       role: "User",
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create user" });
//   }
// });


// router.post("/login", async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare the entered password with the stored hashed password
//     const isMatch = await bcrypt.compare(req.body.password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Don't include the password in the JWT payload (Security Best Practice)
//     const payload = {
//       email: user.email,
//       role: user.role,
//     };

//     const token = jwt.sign(payload, "boutiqueApp", { expiresIn: "1h" });

//     res.status(200).json({ message: "Login Successful", token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Login failed" });
//   }
// });



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
      password:hashedPassword
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


//User Login 
router.post('/login',async(req,res)=>{

})

router.post('/admin',async(req,res)=>{

})


module.exports = router;


