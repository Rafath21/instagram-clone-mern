const User=require("../../models/User");
//get someone's profile
exports.profile=async(req,res)=>{
    const curruserid=req.params.userid;
    const otheruserid=req.body.ouid;
    try{
    let otheruser=await User.findById(otheruserid)
    .populate({path:'posts',populate:{path:'postedBy', select:'username pfp _id'}})
    .populate({path:'posts',populate:{path:'comments',populate:{path:'userid',select:'username pfp _id'}}})
    .populate({path:'followers', select:'username _id pfp'})
    .populate({path:'followings', select:'username _id pfp'})
    console.log(otheruser);
    let otherUserFollowers=otheruser.followers;
    let followStatus;
    console.log(otherUserFollowers);
    let find= otherUserFollowers.find(x=>x._id==curruserid)
    if(find){
        console.log(find);
        followStatus="Following"
    }else{
        followStatus="Follow";
    }
    if(curruserid==otheruserid || otheruser.typeOfAccount=="Public" || find){
        console.log("sending data")
       res.status(200).json({
            _id:otheruser._id,
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
            _id:otheruser._id,
            followStatus:followStatus,
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
