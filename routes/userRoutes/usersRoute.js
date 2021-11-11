const express=require("express");
const router=express.Router();
const {isAuthenticated}=require("../../middlewares/auth");
const {users}=require("../../controllers/userControllers/usersController");
router.route("/:userid").get(isAuthenticated,users);
module.exports=router;