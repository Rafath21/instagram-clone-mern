const express=require("express");
const router=express.Router();
const {newStory}=require("../../controllers/userControllers/storyController");
router.route("/:userid").post(newStory);
module.exports=router;