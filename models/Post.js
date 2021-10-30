const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    posturl:{
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
let Post=mongoose.model("Post",PostSchema);
module.exports=Post;