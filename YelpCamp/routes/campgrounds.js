const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res) => {
    const newCampground = new Campground({
      ...req.body.campground,
    });
    newCampground.author = req.user._id;
    await newCampground.save();
    req.flash("success", "新しいキャンプ場を登録しました");
    res.redirect(`campgrounds/${newCampground._id}`);
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("author");
    if (!campground) {
      req.flash("error", "キャンプ場が見つかりませんでした");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

router.patch(
  "/:id",
  validateCampground,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const c = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    req.flash("success", "キャンプ場を更新しました");
    res.redirect(`/campgrounds/${id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "キャンプ場を削除しました");
    res.redirect("/campgrounds");
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "キャンプ場が見つかりませんでした");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
  })
);

module.exports = router;
