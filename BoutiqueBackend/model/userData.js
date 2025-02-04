// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//   name: String,
//   email:String,
//   phoneNumber:String,
//   address: String,
//   password: String,
//   role: String,
// });

// const userData = mongoose.model("user", userSchema);

// module.exports = userData;


const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: {type: Object, default: {}}
}, {minimize:false});

const userData = mongoose.model("user", userSchema);

module.exports = userData;