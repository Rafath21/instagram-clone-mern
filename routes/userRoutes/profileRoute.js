const express=require("express");
const router=express.Router();
const {profile}=require("../../controllers/userControllers/profileController");
router.route("/:userid").post(profile);
module.exports=router;
