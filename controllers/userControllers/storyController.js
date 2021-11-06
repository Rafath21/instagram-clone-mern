const Story=require("../../models/Story");
const User=require("../../models/User");
const cloudinary=require("cloudinary");
exports.newStory=async(req,res)=>{
    try{
        let {storyurl,caption}=req.body; 
       const myCloud=await cloudinary.v2.uploader.upload(req.body.storyurl,{
        folder:"instagram-clone",
    });
    storyurl=myCloud.secure_url;
      let storyid=await Story.create({
            storyurl:storyurl,
            caption:caption,
            postedBy:req.params.userid
        })

        let user=await User.findById(req.params.userid).populate('followers');
        user.addToStories(storyid);
        await user.save();
        let followers=user.followers;
        let obj={
            userid:req.params.userid,
            stories:user.stories
        }
        followers.map(async(e)=>{
            await User.findById(e._id).then(doc=>{
               let find= doc.storyFeed.find(x=>x.userid==req.params.userid)
               if(!find){
                   doc.storyFeed.push(obj);
               }else{
                    find.stories.push(storyid);
               }
                doc.save();
            })
        })
        res.status(200).json({
            success:true
        })
    }catch(err){
        res.send({
            error:err.message
        })
    }
}
exports.story=async(req,res)=>{
    try{
        let stories=await User.findById(req.params.userid).select('stories').populate({path:'stories'})
        .populate({path:'stories',populate:{path:'postedBy',select:'username pfp _id'}})
        res.status(200).json({
            stories
        })
    }catch(err){
        res.status(200).json({
            err
        })
    }
}