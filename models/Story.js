const mongoose=require('mongoose');
const StorySchema=new mongoose.Schema({
    storyurl:{
        public_id: {
       type: String,
       },
        url: {
        type: String,
       },
    },
    caption:String,
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
let Story=mongoose.model("Story",StorySchema);
module.exports=Story;