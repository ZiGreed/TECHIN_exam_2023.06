const mongoose = require("mongoose");

// /////Service Schema/////
const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A service must have a title"],
    },
    description: String,
    price: {
      type: Number,
      required: [true, "A service must have price"],
    },
    category: {
      type: String,
      ref: "Category",
      required: [true, "A service must have a category"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const serviceModel = mongoose.model("Service", serviceSchema);

module.exports = serviceModel;