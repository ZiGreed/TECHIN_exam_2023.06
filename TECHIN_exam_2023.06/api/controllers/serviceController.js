const Service = require("../models/serviceModel");
const path = require("path");
const { log } = require("console");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../app/public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `service-${Date.now()}.${ext}`);
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

exports.uploadServicePhoto = upload.single("image");

exports.getServices = (req, res) => {
  Service.find(req.query)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
};

exports.postNewService = (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  const newService = {
    ...req.body,
    image: req.file.filename,
  };

  const service = new Service(newService);
  service
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => res.status(404).json(err));
};

exports.getServiceByID = (req, res) => {
  // console.log(req.params);
  let { id } = req.params;
  Service.findById(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
};

exports.deleteService = (req, res) => {
  let { id } = req.params;
  Service.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
};

exports.updateService = (req, res) => {
  let { id } = req.params;
  // query option {new: true} reikalingas, kad vartotojui būtų grąžintas atnaujintas dokumentas t.y. service ir runValidators:true, kad atnaujinanat būtų validuojama pagal schemą

  Service.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => res.status(404).json(err));
};
