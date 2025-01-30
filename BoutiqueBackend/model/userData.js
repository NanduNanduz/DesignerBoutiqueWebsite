const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email:String,
  phoneNumber:String,
  address: String,
  password: String,
  role: String,
});

const userData = mongoose.model("user", userSchema);

module.exports = userData;