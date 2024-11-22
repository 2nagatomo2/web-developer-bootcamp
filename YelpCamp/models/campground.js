const { name } = require("ejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campGroundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  review: {
    type: String,
  },
  evaluation: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
  },
});

const Campground = mongoose.model("campground", campGroundSchema);
module.exports = Campground;
