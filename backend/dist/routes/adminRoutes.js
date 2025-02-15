"use strict";

var express = require('express');
var verifyToken = require('../utils/verifyToken');
var router = express.Router();
var loginController = require("../controller/loginController");
var _require = require('../controller/signupController'),
  signupController = _require.signupController;
var upload = require('../middleware/imageMiddleware');
var controller = require("../controller/eventController");
var validateToken = require("../controller/refreshTokenController");
var dshboardController = require("../controller/dashboardController");
router.post('/signup', signupController);
router.post("/login", loginController.adminLoginController);
router.post("/logout", loginController.logoutController);
router.post('/create-event', upload.array('images'), controller.createEvent);
router.get('/get-events', controller.getEventByCategory);
router.get('/get-event/:id', controller.getEventById);
router["delete"]('/delete-event/:id', controller.deleteEventById);
router.put('/update-event/:id', upload.array('images'), controller.updateEvent);
router.get("/total-events", controller.totalEvents);
router.get("/dashboard-counter", dshboardController.getDashboardCounts);
router.get('/refresh', validateToken.validateTokenController);
module.exports = router;