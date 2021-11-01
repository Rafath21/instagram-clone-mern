const User=require("../../models/User");
const Reel=require("../../models/Reel")
//get a reel
//exports.reel=async(req,res)=>{

//}
exports.updateLikes=async(req,res)=>{
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
exports.updateComments=async(req,res)=>{
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
        let {reelurl,caption}=req.body; 
        let reelid=await Reel.create({
            reelurl:reelurl,
            caption:caption,
            postedBy:req.params.userid
        })
        let user=await User.findById(req.params.userid).populate('followers');
        user.addToReels(reelid);
        await user.save();
        user.addToReelFeed(reelid);
        await user.save();
        let followers=user.followers;
        followers.map(async(e)=>{
            let follower=await User.findById(e._id);
            follower.addToReelFeed(reelid)
            await follower.save();
        })
        res.send("something")
    }catch(err){
        res.send("errror")
        console.log("an errror occured!");
    }
}
