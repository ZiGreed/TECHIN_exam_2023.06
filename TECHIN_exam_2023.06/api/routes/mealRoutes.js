const express = require("express");
const mealController = require('../controllers/mealController')
const mealRouter = express.Router();


mealRouter
  .route("/")
  .get(mealController.getMeals)
  .post(mealController.uploadMealPhoto, mealController.postNewMeal);


mealRouter
    .route("/:id")
    .get(mealController.getMealByID)
    .patch(mealController.updateMeal)
    .delete(mealController.deleteMeal);

module.exports = mealRouter;


