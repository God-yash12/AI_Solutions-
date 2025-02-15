"use strict";

var mongoose = require('mongoose');
var adminSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unqiue: true
  },
  password: {
    type: String,
    require: true,
    unqiue: true
  }
});
module.exports = mongoose.model('Admin', adminSchema);