const express=require('express');
const router=express.Router();

const {login,register,forgotPassword,resetPassword,logout}=require("../../controllers/authControllers/authController");
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotPassword);
router.route('/passwordreset/:resetToken').put(resetPassword);
router.route('/logout').get(logout);
module.exports=router;