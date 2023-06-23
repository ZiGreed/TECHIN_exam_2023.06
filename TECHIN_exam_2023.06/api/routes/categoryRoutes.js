const express = require("express");
const categoryController = require('../controllers/categoryController')

const categoryRouter = express.Router();

categoryRouter
    .route("/")
    .get(categoryController.getCategorys)
    .post(categoryController.postNewCategory);

    categoryRouter
    .route("/:id")
    .get(categoryController.getCategoryByID)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = categoryRouter;

