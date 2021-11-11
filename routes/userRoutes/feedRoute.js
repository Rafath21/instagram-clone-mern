const express=require("express");
const router=express.Router();
const {isAuthenticated}=require("../../middlewares/auth");
const {posts,reels,stories,activity,requests}=require("../../controllers/userControllers/feedController");
router.route("/posts/:userid").get(isAuthenticated,posts)
router.route("/reels/:userid").get(isAuthenticated,reels)
router.route("/stories/:userid").get(isAuthenticated,stories)
router.route("/activity/:userid").get(isAuthenticated,activity)
router.route("/requestsfeed/:userid").get(isAuthenticated,requests)
module.exports=router;