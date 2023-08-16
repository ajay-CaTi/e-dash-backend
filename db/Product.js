const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
});

const model = mongoose.model("products", productSchema);

module.exports = model;

// const mongoose = require("mongoose");

// const productSchema = mongoose.Schema({
//   name: String,
//   price: String,
//   category: String,
//   userId: String,
//   company: String,
// });

// module.exports = mongoose.model("products", productSchema);
