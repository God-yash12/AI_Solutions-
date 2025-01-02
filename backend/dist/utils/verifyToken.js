"use strict";

require('dotenv').config();
var jwt = require("jsonwebtoken");
var verifyToken = function verifyToken(req, res, next) {
  // Retrieve token from cookies (HttpOnly cookie)
  var token = req.cookies.token; // Assuming the token is stored in the 'token' cookie

  if (!token) {
    return res.status(401).json({
      message: "Access denied, no token found"
    });
  }
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    res.status(400).json({
      error: "Invalid or expired token"
    });
  }
};
module.exports = verifyToken;