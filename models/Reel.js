const mongoose=require('mongoose');
const ReelSchema=new mongoose.Schema({
    reelurl:{
        public_id: {
       type: String,
       },
        url: {
        type: String,
       },
    },
    caption:String,
    comments:[
        {
        comment:String,
        userid: {
           type: mongoose.Schema.Types.ObjectId,
           ref:'users'
        }
    }
    ],
    likes:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'users'
        }
    ],
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
})
let Reel=mongoose.model("Post",ReelSchema);
module.exports=Reel;