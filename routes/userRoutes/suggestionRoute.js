const express=require("express");
const router=express.Router();
const {suggestions}=require("../../controllers/userControllers/suggestionsController");

router.route("/:userid").post(suggestions);
module.exports=router;