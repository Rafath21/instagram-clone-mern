const express=require("express");
const router=express.Router();
const {setupProfile}=require("../../controllers/userControllers/setupController");
router.route("/:userid").post(setupProfile);

module.exports=router;