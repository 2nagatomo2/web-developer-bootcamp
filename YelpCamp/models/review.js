const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
