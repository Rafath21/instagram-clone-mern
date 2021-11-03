const express=require("express");
const router=express.Router();
const {newPost,likes,comments,post}=require("../../controllers/userControllers/postController");
router.route("/:userid").post(newPost);
router.route("/likes/:userid").put(likes);
router.route("/comments/:userid").put(comments);
router.route("/delete/:userid").delete(post);
module.exports=router;