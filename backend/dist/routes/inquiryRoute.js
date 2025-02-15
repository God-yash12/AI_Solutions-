"use strict";

var express = require("express");
var router = express.Router();
var controller = require("../controller/inquiresController");
router.post("/create-inquiry", controller.createInquiry);
router.get("/get-inquiries", controller.getInquires);
router.post("/respond-inquiry/:id", controller.respondInquiry);
router.get("/total-inquiry", controller.getTotalInquiry);
router["delete"]('/delete-inquiry/:id', controller.deleteInquiry);
module.exports = router;