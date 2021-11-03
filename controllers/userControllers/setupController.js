const User=require("../../models/User");
const sendEmail=require('../../utils/sendEmail');
const cloudinary=require("cloudinary");
exports.setupProfile=async(req,res)=>{
    try{
      const user=await User.findById(req.params.userid);
     let {bio,username,typeOfAccount,pfp}=req.body
      if(pfp!=""){
        const myCloud=await cloudinary.v2.uploader.upload(req.body.pfp,{
        folder:"instagram-clone",
      });
      pfp=myCloud.secure_url;
      }
      user.setupMethod(username,bio,typeOfAccount,pfp);
      await user.save();
      return res.status(200).json({
          success:true,
          user
      })
    }catch(err){
       return res.status(400).json({
            error: err.message
        })
    }
}