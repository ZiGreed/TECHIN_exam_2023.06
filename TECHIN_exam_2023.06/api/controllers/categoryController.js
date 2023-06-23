const Category = require('../models/categoryModel');
const express = require("express");
const app = express();


exports.getCategorys = (req, res) => {
  // console.log(req.query);
  Category.find(req.query)
    .then((doc) => {
      //console.log(req.query);
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
}

exports.postNewCategory=(req, res)=> {
  Category.create(req.body)
      .then((doc) => {
        // console.log(doc);
        res.status(201).json(doc);
      })
      .catch((err) => res.status(404).json(err));
  }

exports.getCategoryByID = (req, res) => {
  // console.log(req.params);
  let { id } = req.params;
  Category.findById(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
}

exports.deleteCategory = (req, res) => {
  let { id } = req.params;
  Category.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
}

exports.updateCategory = (req, res) => {
  let { id } = req.params;
  // query option {new: true} reikalingas, kad vartotojui būtų grąžintas atnaujintas dokumentas t.y. category ir runValidators:true, kad atnaujinanat būtų validuojama pagal schemą

  Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
}