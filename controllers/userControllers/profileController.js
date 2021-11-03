const User=require("../../models/User");
//get someone's profile
exports.profile=async(req,res)=>{
    const curruserid=req.params.userid;
    const otheruserid=req.body.ouid;
    console.log(curruserid+" "+otheruserid);
    console.log("in profile route");
    try{
    let otheruser=await User.findById(otheruserid).populate('posts')
    .populate({path:'followers', select:'username _id pfp'})
    .populate({path:'followings', select:'username _id pfp'})
    let otherUserFollowers=otheruser.getFollowers();
    console.log("other user followers:",otherUserFollowers);
    if(curruserid==otheruserid || otheruser.typeOfAccount=="Public" || otherUserFollowers.includes(curruserid)){
        console.log("Allowed!")
        res.status(200).json({
            username:otheruser.username,
            pfp:otheruser.pfp,
            bio:otheruser.bio,
            followers:otheruser.followers,
            followings:otheruser.followings,
            posts:otheruser.posts,
        })
    }else{
        console.log("Not allowed")
        res.status(200).json({
            pfp:otheruser.pfp,
            bio:otheruser.bio,
            username:otheruser.username,
            noOfFollowers:otheruser.followers.length,
            noOfFollowings:otheruser.followings.length
        })
    }
    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
   
}
