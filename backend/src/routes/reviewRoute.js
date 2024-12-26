const express = require('express');
const reviewRouter = express.Router();
const controller = require('../controller/reviewController');
const upload = require ('../middleware/imageMiddleware');

reviewRouter.post('/create-review', upload.single('image'), controller.createReview );
reviewRouter.get("/get-reviews", controller.getAllReviews);
reviewRouter.delete("/delete-review/:id", controller.deleteReview)
reviewRouter.patch('/approve/:id', controller.approveReview);
reviewRouter.get("/approved-reviews", controller.getApprovedReviews)

module.exports = reviewRouter;