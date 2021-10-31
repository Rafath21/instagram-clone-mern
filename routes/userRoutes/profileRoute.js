const express=require("express");
const router=express.Router();
const {profile,updateProfile}=require("../../controllers/userControllers/profileController");
router.route("/:userid").get(profile);
router.route("/:userid").post(updateProfile);