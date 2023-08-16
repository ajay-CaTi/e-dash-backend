const Product = require("./db/Product");
const User = require("./db/User");
const cors = require("cors");
require("./db/config");
const express = require("express");
const PORT = 4500;
const app = express();
app.use(express.json());
app.use(cors());
// json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

// parse of JSON object means that to conert it into plain Object {'name':'ajay'} into {name:'ajay'}

app.get("/", (req, res) => {
  res.send({ result: "success" });
});

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  // delete result.password();
  console.log(result);
  res.send(result);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    const user = await User.findOne(req.body).select("-password");
    if (!user) {
      res.send({ result: "User not found" });
    } else {
      res.send(user);
    }
  } else {
    res.send({ result: "Plz enter email or password correctly" });
  }
});

app.post("/add-product", async (req, res) => {
  const product = new Product(req.body);
  let result = await product.save();
  result = result.toObject();
  console.log(result);
  res.send(result);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No product found" });
  }
  console.log(products);
});

app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    console.log(result);
    res.send(result);
  } else {
    res.send({ result: "Record not found" });
  }
});

//update product
app.put("/product/:id", async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: res.body }
  );
  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is run at http://localhost:${PORT}`);
});

// const express = require("express");
// const app = express();
// require("./db/config.js");
// const User = require("./db/User.js");
// const Product = require("./db/Product.js");
// const PORT = 4500;
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send({ result: "Working bro go go go" });
// });

// app.post("/register", async (req, res) => {
//   let user = new User(req.body);
//   let result = await user.save();
//   result = result.toObject();
//   delete result.password;
//   console.log(result);
//   res.send(result);
// });

// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   if (req.body.password && req.body.email) {
//     let user = await User.findOne(req.body).select("-password");
//     if (user) {
//       res.send(user);
//     } else {
//       res.send({ result: "No user found" });
//     }
//   } else {
//     res.send({ result: "Plz enter pass and email correctly" });
//   }
// });

// app.post("/add-product", async (req, res) => {
//   let product = new Product(req.body);
//   let result = await product.save();
//   console.log(result);
//   res.send(result);
// });

// app.get("/products", async (req, res) => {
//   let products = await Product.find();
//   console.log(products);
//   if (products.length > 0) {
//     res.send(products);
//   } else {
//     res.send("No products found");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server run on:- http://localhost:${PORT}`);
// });
