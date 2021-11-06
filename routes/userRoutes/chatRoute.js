const express=require("express");
const router=express.Router();
const {newChat,allChats,getConvo}=require("../../controllers/userControllers/chatController");
//new chat
router.route("/").post(newChat);
//get one user's (all chats)
router.route("/:userid").get(allChats);
//get chat includes two userids
router.route("/:firstuserid/:seconduserid").get(getConvo);

module.exports=router;