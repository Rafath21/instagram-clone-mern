const express=require("express");
const router=express.Router();
const {suggestions}=require("../../controllers/userControllers/suggestionsController");
const {isAuthenticated}=require("../../middlewares/auth");

router.route("/:userid").post(isAuthenticated,suggestions);
module.exports=router;