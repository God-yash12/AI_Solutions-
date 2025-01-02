"use strict";

var express = require('express');
var reviewRouter = express.Router();
var controller = require('../controller/reviewController');
var upload = require('../middleware/imageMiddleware');
reviewRouter.post('/create-review', upload.single('image'), controller.createReview);
reviewRouter.get("/get-reviews", controller.getAllReviews);
reviewRouter["delete"]("/delete-review/:id", controller.deleteReview);
reviewRouter.patch('/approve/:id', controller.approveReview);
reviewRouter.get("/approved-reviews", controller.getApprovedReviews);
reviewRouter.get("/total-reviews", controller.getTotalReviews);
module.exports = reviewRouter;