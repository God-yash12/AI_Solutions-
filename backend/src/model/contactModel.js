const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    // lowercase: true,
    // validate: {
    //   validator: function (email) {
    //     // Basic regex for validating email format
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    //   },
    //   message: 'Invalid email format',
    // },
  },
  phone: {
    type: String,
    // required: [true, 'Phone number is required'],
    // validate: {
    //   validator: function (phone) {
    //     // Regex for validating phone number
    //     return /^\+?[0-9]{7,15}$/.test(phone);
    //   },
    //   message: 'Invalid phone number format',
    // },
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  country: {
    type: Object,
    required: [true, "Country is required"],
    trim: true,
  },
  jobTitle: {
    type: String,
    trim: true,
  },
  jobDetails: {
    type: String,
    // required: [true, 'Job details are required'],
    trim: true,
    // minlength: [10, 'Job details must be at least 10 characters long'],
  },
  submittedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
