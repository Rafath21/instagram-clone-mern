const express=require("express");
const router=express.Router();
const {newStory,story}=require("../../controllers/userControllers/storyController");
const {isAuthenticated}=require("../../middlewares/auth");
router.route("/:userid").post(isAuthenticated,newStory);
router.route("/:userid").get(isAuthenticated,story);
module.exports=router;