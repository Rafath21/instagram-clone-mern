const crypto=require("crypto");
const User=require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");
const sendEmail=require('../../utils/sendEmail');
const sendToken=(user,statusCode,res)=>{
    const token=user.getSignedJwtToken();
    // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
    res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
}
exports.register=async(req,res,next)=>{
    const{username,email,password}=req.body;
    try{
        const user=await User.create({
            username,
            email,
            password,
        });
        sendToken(user,200,res);
        const message1=`A new user ${username} just signed up on the Instagram-clone App `
        const message2=`Hi ${username}! Glad that you signed up on Instagram-clone App. Hope you enjoy the App experience. Please leave
        a feedback if you do.`
        sendEmail({
            to:process.env.EMAIL_USER,
            subject:"New User Signed up!",
            text:message1
        })
        sendEmail({
            to:email,
            subject:"Thank You for signing up!",
            text:message2
        })
    }catch(err){
        next(err);
    }
}
exports.login=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorResponse("Please provide both email and password"));
    }
    try{
        const user=await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorResponse("Invalid credentials",401))
        }
        const isMatch=await user.matchPassword(password);
        if(!isMatch){
            return next(new ErrorResponse("Invalid credentails",401));

        }
        sendToken(user,200,res);
    }
    catch(err){
        next(err);
    }
}

exports.forgotPassword=async(req,res,next)=>{
   const {email} =req.body;
   try{
       const user=await User.findOne({email});
       if(!user){
           return next(new ErrorResponse("Email could not be sent",404));
       }
       const resetToken=user.getResetPasswordToken();
       await user.save();
       const resetUrl=`${req.protocol}://${req.get("host")}/passwordreset/${resetToken}`;
       const message=`
       <h1>You have requested a password reset</h1>
       <p>Please make a put request to the following link:</p>
       <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

       try{
           await sendEmail({
               to:user.email,
               subject:"Password Reset Request",
               text:message,
           })
           res.status(200).json({success:true,data:"Email sent"});
       }catch(err){
           user.resetPasswordToken=undefined;
           user.resetPasswordExpire=undefined;

           await user.save();
           return next(new ErrorResponse("Email could not be sent",500));
       }
   }catch(err){
       next(err);
   }
}
exports.resetPassword=async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try{
        const user=await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()},
        })
        if(!user){
            return next(new ErrorResponse("Invalid Token",400));
        }
        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save();
        res.status(201).json({
            success:true,
            data:"Password updated success",
            token:user.getSignedJwtToken(),
        })
    }
    catch(err){
        next(err);
    }
}
exports.logout=async(req,res,next)=>{
    res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
}