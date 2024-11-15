const express = require("express");
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection ok");
  })
  .catch((err) => {
    console.log("connection error");
    console.log(err);
  });

const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

const categories = ["果物", "野菜", "乳製品", "その他"];

app.get("/products", async (req, res) => {
  const { category } = req.query;
  const products = category
    ? await Product.find({ category })
    : await Product.find();
  res.render("products", { products, category });
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/detail", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    {
      name: name,
      price: parseInt(price),
      category: category,
    },
    { runValidators: true, new: true }
  );
  res.redirect(`/products/${id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.post("/products", async (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = new Product({
    name: name,
    price: parseInt(price),
    category: category,
  });

  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.listen(3000, () => {
  console.log("ポート3000で待受中...");
});
