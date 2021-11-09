const express=require("express");
const router=express.Router();
const {deleteUser}=require("../../controllers/userControllers/deleteUserController");
router.route("/:userid").delete(deleteUser);
module.exports=router;