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
            let obj={
            userid:ouserid,
            stories:otheruser.stories
        }
        curruser.storyFeed.push(obj);
        await otheruser.save();
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
     let obj={
            userid:req.params.userid,
            stories:curruser.stories
        }
        otheruser.storyFeed.push(obj);
        await otheruser.save();
    //remove from activity also
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
        user.deleteFromRequests(ouid);
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