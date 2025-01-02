"use strict";

var mongoose = require('mongoose');
var InquirySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
    // enum: ['General Inquiry', 'Feedback', 'Support', 'Sales', 'Partnership', 'Other'],
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  submittedDate: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('Inquiry', InquirySchema);