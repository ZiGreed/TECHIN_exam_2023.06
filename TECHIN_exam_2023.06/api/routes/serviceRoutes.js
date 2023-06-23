const express = require("express");
const serviceController = require('../controllers/serviceController')
const serviceRouter = express.Router();


serviceRouter
  .route("/")
  .get(serviceController.getServices)
  .post(serviceController.uploadServicePhoto, serviceController.postNewService);


  serviceRouter
    .route("/:id")
    .get(serviceController.getServiceByID)
    .patch(serviceController.updateService)
    .delete(serviceController.deleteService);

module.exports = serviceRouter;


