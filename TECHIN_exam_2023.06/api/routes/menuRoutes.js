const express = require("express");
const menuController = require('../controllers/menuController')

const menuRouter = express.Router();

menuRouter
    .route("/")
    .get(menuController.getMenus)
    .post(menuController.postNewMenu);

menuRouter
    .route("/:id")
    .get(menuController.getMenuByID)
    .patch(menuController.updateMenu)
    .delete(menuController.deleteMenu);

module.exports = menuRouter;

