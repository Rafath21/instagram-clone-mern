const express=require("express");
const router=express.Router();
const {newChat,allChats,getConvo}=require("../../controllers/userControllers/chatController");
const {isAuthenticated} =require("../../middlewares/auth")
//new chat
router.route("/").post(isAuthenticated,newChat);
//get one user's (all chats)
router.route("/:userid").get(isAuthenticated,allChats);
//get chat includes two userids
router.route("/convo/:firstuserid").post(isAuthenticated,getConvo);

module.exports=router;