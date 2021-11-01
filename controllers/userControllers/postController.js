const User=require("../../models/User");
const Post=require("../../models/Post")
exports.updateLikes=async(req,res)=>{
    try{
    const curruserid=req.params.userid;
    const postid=req.body.postid;
    let post=await Post.findById(postid);
    let likesArr=post.likes;
    if(likesArr.includes(curruserid)){
        post.removeFromLikes(curruserid);
        await post.save();
    }else{
        post.addToLikes(curruserid);
        await post.save()
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
    const postid=req.body.postid;
    let post=await Post.findById(postid);
    post.addToComments(comment,curruserid)
    await post.save();
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
//post a new post
exports.newPost=async(req,res)=>{
    try{
        let {posturl,caption}=req.body; 
        let postid=await Post.create({
            posturl:posturl,
            caption:caption,
            postedBy:req.params.userid
        })
        console.log(postid);
        let user=await User.findById(req.params.userid).populate('followers');
        user.addToPosts(postid);
        await user.save();
        user.addToPostFeed(postid);
        await user.save();
        let followers=user.followers;
        followers.map(async(e)=>{
            let follower=await User.findById(e._id);
            follower.addToPostFeed(postid)
            await follower.save();
        })
        res.status(200).json({
            success:true,
            message:"Posted successfully!"
        })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
exports.deletePost=async(req,res)=>{
    try{
        let curruserid=req.params.userid;
        let postid=req.body.postid;
        let post=await Post.findById(postid);
        if(post.postedBy._id!=curruserid){
            res.status(400).json({
                succuess:false,
                message:"You can't delete this post since you didn't create it!"
            })
        }else{
            await post.remove();
           let curruser=await User.findById(curruserid);
            curruser.deleteFromPosts(postid);
            await curruser.save();
            curruser.deleteFromPostFeed(postid);
            await curruser.save();
            let followers=curruser.followers;
            followers.map(async(e)=>{
            let follower=await User.findById(e._id);
            follower.deleteFromPostFeed(postid)
            await follower.save();
        })
        res.status(200).json({
            success:true,
            message:"Post Deleted!"
        })
        }
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
