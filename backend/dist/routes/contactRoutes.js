"use strict";

var express = require('express');
var router = express.Router();
var controller = require('../controller/contactController');
router.post("/contact", controller.contactController);
router.get("/get-contacts", controller.getContacts);
module.exports = router;