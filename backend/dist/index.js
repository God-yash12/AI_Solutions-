"use strict";

var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var DBConnection = require('./config/db_config');
var cookieParser = require('cookie-parser');
var _require = require('dotenv'),
  configDotenv = _require.configDotenv;
require('dotenv').config();
var adminRoutes = require("./routes/adminRoutes");
var contactRoute = require("./routes/contactRoutes");
var reviewRoute = require("./routes/reviewRoute");
var blogRoute = require("./routes/blogRoutes");
var InquiryRoute = require("./routes/inquiryRoute");
var app = express();
var PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/public', express["static"](path.join(__dirname, '..', 'public')));
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Database connection 
DBConnection();

// Routing
app.use("/api/admin", adminRoutes);
app.use("/api/inquiry", contactRoute);
app.use("/api/review", reviewRoute);
app.use("/api/blog", blogRoute);
app.use("/api/inquiry", InquiryRoute);
app.listen(PORT, function () {
  console.log("Server running at http://localhost:".concat(PORT));
}).on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    console.error("Port ".concat(PORT, " is already in use. Please use a different port."));
  } else {
    console.error("Error starting server:", err);
  }
});