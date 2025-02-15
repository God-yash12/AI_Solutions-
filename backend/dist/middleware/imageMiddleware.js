"use strict";

var multer = require('multer');
var path = require('path');

// Storage Configuration
var storage = multer.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, path.join(process.cwd(), 'public'));
  },
  filename: function filename(req, file, callback) {
    console.log(file.originalname);
    var filename = Date.now().toString() + '-' + file.originalname;
    callback(null, filename);
  }
});

// File Filter for Images
var fileFilter = function fileFilter(req, file, callback) {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    req.isFilevalid = true;
    callback(null, true);
  } else {
    req.isFilevalid = false;
    callback(new Error('Only JPG, JPEG, and PNG files are allowed'), false);
  }
};

// Multer Configuration
var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});
module.exports = upload;