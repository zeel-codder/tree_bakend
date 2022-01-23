const express=require("express");
const { Hello }=require("../controllers/category");

var router= express.Router()

router.get('/',Hello)


exports.CategoryRoute=router;