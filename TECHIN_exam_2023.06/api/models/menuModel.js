const mongoose = require("mongoose");

// /////Menu Schema/////
const menuSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "A menu must have a title"],
    },
}, {
    timestamps: true
});

// ////Menu Model////
const menuModel = mongoose.model("Menu", menuSchema);

module.exports = menuModel;