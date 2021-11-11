const express=require("express");
const router=express.Router();
const {newPost,likes,comments,post}=require("../../controllers/userControllers/postController");
const {isAuthenticated}=require("../../middlewares/auth");
router.route("/:userid").post(isAuthenticated,newPost);
router.route("/likes/:userid").put(isAuthenticated,likes);
router.route("/comments/:userid").put(isAuthenticated,comments);
router.route("/delete/:userid").delete(isAuthenticated,post);
module.exports=router;