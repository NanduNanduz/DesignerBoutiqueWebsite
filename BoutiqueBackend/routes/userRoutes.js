const express = require("express");

const router = express.Router();

router.use(express.json());

const userModel = require("../model/userData");

const jwt = require("jsonwebtoken");


router.post("/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  try {
    if (user.password == req.body.password) {
      // generating token when the password and email is matched
      const payload = {
        email: user.email,
        password: user.password,
        role: user.role,
      };
      const token = jwt.sign(payload, "employeeApp"); // employeeApp - secret key
      // fetched user password is checked with the given pass
      //sending this token to the frontend
      //store that in the front end session storage
      res.status(200).send({ message: "Login Successful", token: token });
    } else {
      res.status(400).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;


