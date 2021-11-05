const express=require("express");
const router=express.Router();
const {users}=require("../../controllers/userControllers/usersController");
router.route("/:userid").get(users);
module.exports=router;