const express=require("express");
const router=express.Router();
const {deleteActivity}=require("../../controllers/userControllers/activityController");
router.route("/deleteActivity/:userid").delete(deleteActivity);
module.exports=router;