const User=require("../../models/User");
exports.posts=async(req,res)=>{ 
    try{
        let curruserid=req.params.userid;
        const options = { sort: {'createdAt': -1 } };
        let postFeed=await User.findById(curruserid).populate({path:'postFeed',populate:{path:'postedBy', select:'username _id pfp'},options})
        .populate({path:'postFeed',populate:{path:'comments',populate:{path:'userid',select:'username _id pfp'}}});
        postFeed=postFeed.postFeed;
        res.status(200).json({
            success:true,
            message:"Get feed posts successful!",
            postFeed:postFeed
        })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
exports.reels=async(req,res)=>{
    try{
        let curruserid=req.params.userid;
        let reelFeed=await User.findById(curruserid)
        .populate({path:'reelFeed',populate:{path:'postedBy', select:'username _id pfp'}})
        .populate({path:'reelFeed',populate:{path:'comments',populate:{path:'userid',select:'username _id pfp'}}});
        reelFeed=reelFeed.reelFeed;

        res.status(200).json({
            success:true,
            reelFeed:reelFeed
        })

    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
exports.stories=async(req,res)=>{
 try{
        let curruserid=req.params.userid;
        let storyFeed=await User.findById(curruserid)
        .populate({path:'storyFeed',populate:{path:'stories',populate:{path:'postedBy',select:'username pfp _id'}}})
        .populate({path:'storyFeed',populate:{path:'userid',select:'username pfp _id'}})
        storyFeed=storyFeed.storyFeed;
        res.status(200).json({
            success:true,
           storyFeed:storyFeed
        })

    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
exports.activity=async(req,res)=>{
 try{
        let curruserid=req.params.userid;
        let activityFeed=await User.findById(curruserid).populate({path:'activity',select:'username _id pfp'})
        activityFeed=activityFeed.activity;
        res.status(200).json({
            success:true,
            activityFeed:activityFeed
        })

    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
exports.requests=async(req,res)=>{
    try{
        let curruserid=req.params.userid;
        let requestsFeed=await User.findById(curruserid).populate({path:'requests',select:'username _id pfp'})
        requestsFeed=requestsFeed.requests;
        res.status(200).json({
            success:true,
            requestsFeed:requestsFeed
        })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}