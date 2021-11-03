const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    posturl:{
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
})
PostSchema.methods.addToLikes=function(userid){
    this.likes.push(userid)
}
PostSchema.methods.removeFromLikes=function(userid){
    let likes=this.likes;
    console.log(likes);
    const index=likes.indexOf(userid);
    if(index>-1){
        likes.splice(index,1)
    }
    this.likes=likes;
}
PostSchema.methods.addToComments=function(comment,userid){
    let obj={
        comment:comment,
        userid:userid
    }
    this.comments.push(obj);
}
let Post=mongoose.model("Post",PostSchema);
module.exports=Post;