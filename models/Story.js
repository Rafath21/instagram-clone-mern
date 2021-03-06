const mongoose=require('mongoose');
const StorySchema=new mongoose.Schema({
    storyurl:{
        type: String,
    },
    caption:String,
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
{timestamps:true}
)
let Story=mongoose.model("Story",StorySchema);
module.exports=Story;