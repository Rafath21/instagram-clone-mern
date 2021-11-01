const User=require("../../models/User");
const sendEmail=require('../../utils/sendEmail');
const cloudinary=require("cloudinary");
exports.setupProfile=async(req,res)=>{
    try{
      const myCloud=await cloudinary.v2.uploader.upload(req.body.pfp,{
        folder:"instagram-clone",
    });
      let user=await User.findById(req.params.userid);
      let {username,bio,typeOfAccount,pfp}=req.body;
      pfp={
          public_id:myCloud.public_id,
        url:myCloud.secure_url,
      }
      user.setupMethod(username,bio,typeOfAccount,pfp);
      await user.save();
      const message1=`A new user ${username} just signed up on the Instagram-clone App `
    const message2=`Hi ${username}! Glad that you signed up on Instagram-clone App. Hope you enjoy the App experience. Please leave
        a feedback if you do.`
        sendEmail({
            to:process.env.EMAIL_USER,
            subject:"New User Signed up!",
            text:message1
        })
        sendEmail({
            to:user.email,
            subject:"Thank You for signing up!",
            text:message2
        })
      return res.status(200).json({
          success:true,
          message: "Profile setup successfully!",
      })
    }catch(err){
       return res.status(400).json({
            error: err.message
        })
    }
}