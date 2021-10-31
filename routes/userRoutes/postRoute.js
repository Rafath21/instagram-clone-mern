const express=require("express");
const router=express.Router();
const {allLikes,allComments,updateLikes,updateComments}=require("../../controllers/userControllers/postController");
router.route("/:userid/likes").get(allLikes);
router.route("/:userid/comments").get(allComments);
router.route("/:userid/likes").post(updateLikes);
router.route("/:userid/comments").post(updateComments);