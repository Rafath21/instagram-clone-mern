const express=require("express");
const router=express.Router();
const {newStory}=require("../../controllers/userControllers/postController");
router.route("/:userid").post(newStory);
module.exports=router;