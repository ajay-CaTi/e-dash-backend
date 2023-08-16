const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  email: String,
});

const uModel = mongoose.model("users", userSchema);

module.exports = uModel;

// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// module.exports = mongoose.model("users", userSchema);
