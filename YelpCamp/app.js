const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Campground = require("./models/campground");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongoDBコネクションOK！！");
  })
  .catch((err) => {
    console.log("コネクションエラー！！！");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.post("/campgrounds", async (req, res) => {
  const { title, price, location, description } = req.body;
  const newCampground = new Campground({
    title,
    price,
    location,
    description,
  });
  await newCampground.save();
  res.redirect(`campgrounds/${newCampground._id}`);
});

app.get("/campgrounds/new", async (req, res) => {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/show", { campground });
});

app.patch("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, location, description } = req.body;
  await Campground.findByIdAndUpdate(id, {
    title,
    price,
    location,
    description,
  });
  res.redirect(`/campgrounds/${id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
});

app.listen(3000, () => {
  console.log("ポート3000で待受中...");
});
