const express=require("express");
const router=express.Router();
const {newReel,updateLikes,updateComments}=require("../../controllers/userControllers/reelController");
router.route("/:userid").post(newReel);
router.route("/likes/:userid").post(updateLikes);
router.route("/comments/:userid").post(updateComments);
module.exports=router;