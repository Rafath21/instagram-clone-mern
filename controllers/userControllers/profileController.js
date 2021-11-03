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
    let followStatus="";
    if(otherUserFollowers.includes(curruserid)){
        followStatus="Following"
    }
    if(curruserid==otheruserid || otheruser.typeOfAccount=="Public" || otherUserFollowers.includes(curruserid)){
        res.status(200).json({
            followStatus:followStatus,
            status:"allowed",
            username:otheruser.username,
            pfp:otheruser.pfp,
            bio:otheruser.bio,
            followers:otheruser.followers,
            followings:otheruser.followings,
            posts:otheruser.posts,
            followersCount:otheruser.followers.length,
            followingsCount:otheruser.followings.length,
            postsCount:otheruser.posts.length
        })
    }else{
        res.status(200).json({
            status:"Not allowed",
            pfp:otheruser.pfp,
            bio:otheruser.bio,
            username:otheruser.username,
            followersCount:otheruser.followers.length,
            followingsCount:otheruser.followings.length,
            postsCount:otheruser.posts.length

        })
    }
    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
   
}
