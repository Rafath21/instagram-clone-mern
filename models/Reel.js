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