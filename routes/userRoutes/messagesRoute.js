const express=require("express");
const router=express.Router();
const {messages,message}=require("../../controllers/userControllers/messagesController");
const {isAuthenticated}=require("../../middlewares/auth");
router.route("/").post(isAuthenticated,message);
router.route("/:chatId").get(isAuthenticated,messages);

module.exports=router;