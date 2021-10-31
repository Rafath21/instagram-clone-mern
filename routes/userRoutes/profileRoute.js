const express=require("express");
const router=express.Router();
const {profile}=require("../../controllers/userControllers/profileController");
const {setupProfile}=require("../../controllers/userControllers/setupController");
router.route("/:userid").get(profile);
router.route("/:userid").post(setupProfile);
module.exports=router;
