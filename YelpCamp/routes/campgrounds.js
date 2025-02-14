const express = require("express");
const router = express.Router();
const campgrorounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgrorounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrorounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrorounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrorounds.showCampgounds))
  .patch(
    validateCampground,
    isAuthor,
    catchAsync(campgrorounds.updateCampgrounds)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrorounds.deleteCampgrounds));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrorounds.renderEditForm)
);

module.exports = router;
