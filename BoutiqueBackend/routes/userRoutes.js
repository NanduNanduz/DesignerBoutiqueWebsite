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
  try {
    
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({ success: false, message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    // if password also match then generate a token and send to the user
    if(isMatch){
      const token  = createToken(user._id)
      res.json({success:true,token})
    }
    else{
      res.json({success:false, message:'Invalid credentials'})
    }
  }
   catch (error) {
     console.log(error);
     res.json({ success: false, message: error.message });
  }
})


router.post('/admin',async(req,res)=>{

})


module.exports = router;
