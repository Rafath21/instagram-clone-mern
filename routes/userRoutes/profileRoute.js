const express=require("express");
const router=express.Router();
const {profile}=require("../../controllers/userControllers/profileController");
const {isAuthenticated}=require("../../middlewares/auth");
router.route("/:userid").post(isAuthenticated,profile);
module.exports=router;
