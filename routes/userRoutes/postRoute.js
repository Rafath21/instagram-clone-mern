const express=require("express");
const router=express.Router();
const {post,newPost,updateLikes,updateComments}=require("../../controllers/userControllers/postController");
//router.route("/:userid").get(post);

router.route("/:userid").post(newPost);
router.route("/likes/:userid").post(updateLikes);
router.route("/comments/:userid").post(updateComments);
module.exports=router;