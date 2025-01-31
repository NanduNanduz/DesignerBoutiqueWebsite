const express = require("express");

const router = express.Router();

router.use(express.json());

const userModel = require("../model/userData");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

router.post("/adduser", async (req, res) => {
  const { name, email, phoneNumber, address, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      phoneNumber,
      address,
      password: hashedPassword, // Store the hashed password
      role: "User",
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Don't include the password in the JWT payload (Security Best Practice)
    const payload = {
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, "boutiqueApp", { expiresIn: "1h" });

    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});


// //login
// router.post("/login", async (req, res) => {
//   const user = await userModel.findOne({ email: req.body.email });
//   if (!user) {
//     res.status(404).send({ message: "User not found" });
//   }
//   try {
//     if (user.password == req.body.password) {
//       // generating token when the password and email is matched
//       const payload = {
//         email: user.email,
//         password: user.password,
//         role: user.role,
//       };
//       const token = jwt.sign(payload, "employeeApp"); // employeeApp - secret key
//       // fetched user password is checked with the given pass
//       //sending this token to the frontend
//       //store that in the front end session storage
//       res.status(200).send({ message: "Login Successful", token: token });
//     } else {
//       res.status(400).send({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });


// //signup
// router.post("/adduser", async (req, res) => {
//   const { name, email, phoneNumber, address, password } = req.body;
//   try {
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const newUser = new userModel({
//       name,
//       email,
//       phoneNumber,
//       address,
//       password,
//       role: "User",
//     });
//     await newUser.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create" });
//   }
// });




module.exports = router;


