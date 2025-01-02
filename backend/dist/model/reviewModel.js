"use strict";

// In your ReviewModel schema
var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  approved: {
    type: Boolean,
    "default": false
  }
});
var ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;