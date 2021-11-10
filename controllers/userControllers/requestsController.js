const User=require("../../models/User");
exports.handleRequests=async(req,res)=>{
    try{
      let ouserid=req.body.ouid; //other user's id
      let curruserid=req.params.userid
    let curruser=await User.findById(curruserid);
        let otheruser=await User.findById(ouserid);
        if(otheruser.typeOfAccount==="Private"){
            otheruser.requests.push(curruserid)
            await otheruser.save();
            res.status(200).json({
                success:true,
                followStatus:"Requested"
            })
        }else{
            otheruser.activity.push(curruserid);
            otheruser.followers.push(curruserid)
            await otheruser.save();
            curruser.followings.push(ouserid);
            await curruser.save();
            otheruser.posts.map(async(e)=>{
                curruser.postFeed.push(e);
                await curruser.save();
            })
            if(otheruser.reels.length>0){
                otheruser.reels.map(async(e)=>{
                curruser.reelFeed.push(e);
                await curruser.save();
            })
            }
            
            let obj={
            userid:ouserid,
            stories:otheruser.stories
        }
        if(otheruser.stories.length>0){
        curruser.storyFeed.push(obj);
        await curruser.save();
        }
    
           res.status(200).json({
                success:true,
                followStatus:"Following"
            })
        }
    
}catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
//when curr user accepts other user's follow request
exports.acceptRequest=async(req,res)=>{
    try{
    let curruserid=req.params.userid;
    let otheruserid=req.body.ouid;
    let curruser=await User.findById(curruserid);
    let otheruser=await User.findById(otheruserid);
    curruser.followers.push(otheruserid);
    await curruser.save();
    otheruser.followings.push(curruserid)
    await otheruser.save();
    curruser.posts.map(async(e)=>{
                otheruser.postFeed.push(e);
                await otheruser.save();
            })
             if(curruser.reels.length>0){
                curruser.reels.map(async(e)=>{
                otheruser.reelFeed.push(e);
                await otheruser.save();
            })
            }
     let obj={
            userid:req.params.userid,
            stories:curruser.stories
        }
        if(curruser.stories.length>0){
        otheruser.storyFeed.push(obj);
        await otheruser.save();
        }
       
    //remove from activity also
    let requests=curruser.requests;
    requests=requests.filter((e)=>{
        return e._id!=otheruserid
    })
    curruser.requests=requests;
    curruser.save();
   res.status(200).json({
        success:true,
        message:"Successfully accepted!!"
    })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
   

}
exports.deleteRequest=async(req,res)=>{
    try{
        let curruserid=req.params.userid;
        let ouid=req.body.ouid;
        let user=await User.findById(curruserid);
        user.requests.remove(ouid)
        await user.save();
        res.status(200).json({
            success:true,
            message:"Request Deleted"
        })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}