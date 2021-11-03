const express=require("express");
const router=express.Router();
const {newReel,likes,comments}=require("../../controllers/userControllers/reelController");
router.route("/:userid").post(newReel);
router.route("/likes/:userid").put(likes);
router.route("/comments/:userid").put(comments);
module.exports=router;