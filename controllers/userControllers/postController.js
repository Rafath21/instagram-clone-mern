const User=require("../../models/User");
const Post=require("../../models/Post")
//get a post
//exports.post=async(req,res)=>{

//}
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
        let user=await User.findById(req.params.userid).populate('followers');
        user.addToPosts(postid);
        await user.save();
        let followers=user.followers;
        followers.map(async(e)=>{
            let follower=await User.findById(e._id);
            follower.addToPostFeed(postid)
            await follower.save();
        })
        res.send("something")
    }catch(err){
        res.send("errror")
        console.log("an errror occured!");
    }
}
