const mongoose = require("mongoose");

// /////Meal Schema/////
const mealSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A meal must have a title"],
    },
    description: String,
    price: {
      type: Number,
      required: [true, "A meal must have price"],
    },
    category: {
      type: String,
      ref: "Menu",
      required: [true, "A meal must have a category"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const mealModel = mongoose.model("Meal", mealSchema);

module.exports = mealModel;