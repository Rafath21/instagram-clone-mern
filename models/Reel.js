const mongoose=require('mongoose');
const ReelSchema=new mongoose.Schema({
    reelurl:{
        type: String,
    },
    caption:String,
    comments:[
        {
        comment:String,
        userid: {
           type: mongoose.Schema.Types.ObjectId,
           ref:'User'
        }
    }
    ],
    likes:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'User'
        }
    ],
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
{timestamps:true}
)
ReelSchema.methods.addToLikes=function(userid){
    this.likes.push(userid)
}
ReelSchema.methods.removeFromLikes=function(userid){
    let likes=this.likes;
    console.log(likes);
    const index=likes.indexOf(userid);
    if(index>-1){
        likes.splice(index,1)
    }
    this.likes=likes;
}
ReelSchema.methods.addToComments=function(comment,userid){
    let obj={
        comment:comment,
        userid:userid
    }
    this.comments.push(obj);
}
let Reel=mongoose.model("Reel",ReelSchema);
module.exports=Reel;