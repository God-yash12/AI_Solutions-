const express=require('express');
const router=express.Router();
const controller = require('../controller/contactController');

router.post("/contact", controller.contactController);
router.get("/get-contacts", controller.getContacts);

module.exports=router