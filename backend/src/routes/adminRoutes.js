const express=require('express');
const verifyToken=require('../utils/verifyToken')
const router=express.Router();
const loginController =  require("../controller/loginController")
const {signupController}=require('../controller/signupController')
const upload = require('../middleware/imageMiddleware')
const controller = require("../controller/eventController");
const validateToken = require("../controller/refreshTokenController")

router.post('/signup', signupController)
router.post("/login",  loginController.adminLoginController);
router.post("/logout", loginController.logoutController)
router.post('/create-event', upload.array('images'), controller.createEvent);
router.get('/get-events',  controller.getEventByCategory)
router.get('/get-event/:id', controller.getEventById)
router.delete('/delete-event/:id', controller.deleteEventById);
router.put('/update-event/:id', upload.array('images'), controller.updateEvent)
router.get('/refresh', validateToken.validateTokenController)

module.exports=router