const Meal = require("../models/mealModel");
const path = require("path");
const { log } = require("console");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../app/public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `meal-${Date.now()}.${ext}`);
  },
});

//filtras reikalingas tam, kad neleisti užkrauti kitokių failų nei paveikslėliai
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image, please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadMealPhoto = upload.single("image");

exports.getMeals = (req, res) => {
  Meal.find(req.query)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
};

exports.postNewMeal = (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  const newMeal = {
    ...req.body,
    image: req.file.filename,
  };

  const meal = new Meal(newMeal);
  meal
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => res.status(404).json(err));
};

exports.getMealByID = (req, res) => {
  // console.log(req.params);
  let { id } = req.params;
  Meal.findById(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
};

exports.deleteMeal = (req, res) => {
  let { id } = req.params;
  Meal.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
};

exports.updateMeal = (req, res) => {
  let { id } = req.params;
  // query option {new: true} reikalingas, kad vartotojui būtų grąžintas atnaujintas dokumentas t.y. meal ir runValidators:true, kad atnaujinanat būtų validuojama pagal schemą

  Meal.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
};
