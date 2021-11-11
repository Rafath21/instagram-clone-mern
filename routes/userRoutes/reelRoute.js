const express=require("express");
const router=express.Router();
const {newReel,likes,comments}=require("../../controllers/userControllers/reelController");
const {isAuthenticated}=require("../../middlewares/auth");
router.route("/:userid").post(isAuthenticated,newReel);
router.route("/likes/:userid").put(isAuthenticated,likes);
router.route("/comments/:userid").put(isAuthenticated,comments);
module.exports=router;