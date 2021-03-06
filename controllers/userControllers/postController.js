const User=require("../../models/User");
const Post=require("../../models/Post")
const cloudinary=require("cloudinary");
exports.likes=async(req,res)=>{
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
exports.comments=async(req,res)=>{
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
        const myCloud=await cloudinary.v2.uploader.upload(req.body.posturl,{
        folder:"instagram-clone",
    });
        posturl=myCloud.secure_url;
        let postid=await Post.create({
            posturl:posturl,
            caption:caption,
            postedBy:req.params.userid
        })
        let user=await User.findById(req.params.userid).populate('followers');
        user.posts.push(postid);
        await user.save();
        user.postFeed.push(postid);
        await user.save();
        let followers=user.followers;
        followers.map(async(e)=>{
            let follower=await User.findById(e._id);
            follower.postFeed.push(postid)
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
//delete a post
exports.post=async(req,res)=>{
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
