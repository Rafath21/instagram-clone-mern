const Story=require("../../models/Story");
const User=require("../../models/User");
exports.newStory=async(req,res)=>{
    try{
        let {storyurl,caption}=req.body; 
        let storyid=await Story.create({
            storyurl:storyurl,
            caption:caption,
            postedBy:req.params.userid
        })
        let user=await User.findById(req.params.userid).populate('followers');
        user.addToStories(storyid);
        await user.save();
        let followers=user.followers;
        followers.map(async(e)=>{
            let follower=await User.findById(e._id);
            follower.addToStoryFeed(storyid)
            await follower.save();
        })
        res.send("something")
    }catch(err){
        res.send("errror")
        console.log("an errror occured!");
    }
}