const express=require("express");
const router=express.Router();
const {setupProfile}=require("../../controllers/userControllers/setupController");
const {isAuthenticated}=require("../../middlewares/auth");
router.route("/:userid").post(isAuthenticated,setupProfile);

module.exports=router;