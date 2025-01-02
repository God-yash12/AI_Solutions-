"use strict";

var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    require: true
  },
  images: [{
    type: String,
    required: false
  }],
  eventDetails: {
    type: String,
    required: true
  }
});
var Events = mongoose.model('Events', eventSchema);
module.exports = Events;