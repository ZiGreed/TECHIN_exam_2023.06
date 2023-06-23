const mongoose = require("mongoose");

// /////Category Schema/////
const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "A category must have a title"],
    },
}, {
    timestamps: true
});

// ////Category Model////
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;