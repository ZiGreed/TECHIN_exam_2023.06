const Menu = require('../models/menuModel');
const express = require("express");
const app = express();


exports.getMenus = (req, res) => {
  // console.log(req.query);
  Menu.find(req.query)
    .then((doc) => {
      //console.log(req.query);
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
}

exports.postNewMenu=(req, res)=> {
    Menu.create(req.body)
      .then((doc) => {
        // console.log(doc);
        res.status(201).json(doc);
      })
      .catch((err) => res.status(404).json(err));
  }

exports.getMenuByID = (req, res) => {
  // console.log(req.params);
  let { id } = req.params;
  Menu.findById(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
}

exports.deleteMenu = (req, res) => {
  let { id } = req.params;
  Menu.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
}

exports.updateMenu = (req, res) => {
  let { id } = req.params;
  // query option {new: true} reikalingas, kad vartotojui būtų grąžintas atnaujintas dokumentas t.y. menu ir runValidators:true, kad atnaujinanat būtų validuojama pagal schemą

  Menu.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
}