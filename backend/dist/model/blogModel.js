"use strict";

var mongoose = require('mongoose');
var BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: Date,
    "default": Date.now,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  }
});
var Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;