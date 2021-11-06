const express=require("express");
const router=express.Router();
const {messages,message}=require("../../controllers/userControllers/messagesController");
router.route("/").post(message);
router.route("/:chatId").get(messages);

module.exports=router;