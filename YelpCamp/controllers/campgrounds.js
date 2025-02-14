const Campground = require("../models/campground");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.showCampgounds = async (req, res) => {
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
};

module.exports.createCampground = async (req, res) => {
  const newCampground = new Campground({
    ...req.body.campground,
  });
  newCampground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  newCampground.author = req.user._id;
  await newCampground.save();
  req.flash("success", "新しいキャンプ場を登録しました");
  res.redirect(`campgrounds/${newCampground._id}`);
};

module.exports.updateCampgrounds = async (req, res) => {
  const { id } = req.params;
  const c = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  req.flash("success", "キャンプ場を更新しました");
  res.redirect(`/campgrounds/${id}`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "キャンプ場が見つかりませんでした");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
};

module.exports.deleteCampgrounds = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "キャンプ場を削除しました");
  res.redirect("/campgrounds");
};
