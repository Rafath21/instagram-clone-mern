const express=require("express");
const router=express.Router();
const {deleteActivity}=require("../../controllers/userControllers/activityController");
const {isAuthenticated} =require("../../middlewares/auth")
router.route("/deleteActivity/:userid").delete(isAuthenticated,deleteActivity);
module.exports=router;