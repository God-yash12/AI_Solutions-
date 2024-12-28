const express = require('express')
const router = express.Router();
const controller = require ('../controller/inquiresController');
const { route } = require('./blogRoutes');


router.post('/create-inquiry', controller.createInquiry);
router.get('/get-inquiries', controller.getInquires)
router.post('/respond-inquiry/:id', controller.respondInquiry)

module.exports = router;