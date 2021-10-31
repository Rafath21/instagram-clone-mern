const express=require("express");
const router=express.Router();
const {isAuthenticated}=require("../../middlewares/auth");
const {posts,reels,stories,activity,requests}=require("../../controllers/userControllers/feedController");
router.route("/posts/:userid").get(posts)
router.route("/reels/:userid").get(reels)
router.route("/stories/:userid").get(stories)
router.route("/activity/:userid").get(activity)
router.route("/requestsfeed/:userid").get(requests)
module.exports=router;