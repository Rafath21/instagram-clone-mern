const User=require("../../models/User");
const Reel=require("../../models/Reel")
const cloudinary=require("cloudinary");
exports.likes=async(req,res)=>{
    try{
    const curruserid=req.params.userid;
    const reelid=req.body.reelid;
    let reel=await Reel.findById(reelid);
    let likesArr=reel.likes;
    if(likesArr.includes(curruserid)){
        reel.removeFromLikes(curruserid);
        await reel.save();
    }else{
        reel.addToLikes(curruserid);
        await reel.save()
    }
    res.status(200).json({
        success:true,
        message:"Like updated"
    })

    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
   
}
exports.comments=async(req,res)=>{
    try{
    const curruserid=req.params.userid;
    const comment=req.body.comment;
    const reelid=req.body.reelid;
    let reel=await Reel.findById(reelid);
    reel.addToComments(comment,curruserid)
    await reel.save();
    res.status(200).json({
        success:true,
        message:"Comment Added"
    })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
//reel a new reel
exports.newReel=async(req,res)=>{
    try{
        console.log("in reel controller")
        let {reelurl,caption}=req.body; 
        let reelid;
        const myCloud=await cloudinary.v2.uploader.upload(req.body.reelurl,{
        resource_type:"video",
        folder:"instagram-clone",
    }).then(async(result)=>{
            console.log(result);
            reelurl=result.secure_url;
            reelid=await Reel.create({
            reelurl:reelurl,
            caption:caption,
            postedBy:req.params.userid
    });
        let user=await User.findById(req.params.userid).populate('followers');
        user.reels.push(reelid);
        await user.save();
        user.reelFeed.push(reelid);
        await user.save();
        let followers=user.followers;
        followers.map(async(e)=>{
            let follower=await User.findById(e._id);
            follower.reelFeed.push(reelid);
            await follower.save();
        })
        res.status(200).json({
            success:true,
            message:"Posted succuessfully!"
        })

    })
     
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
