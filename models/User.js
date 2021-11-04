const mongoose=require('mongoose');
const crypto=require("crypto");
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');
let UserSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"Please provide an email address"],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
        ]
    },
    password:{
        type:String,
        required:[true,"Please add a password"],
        minlength:6,
        select:false,
    },
    posts:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'Post'
        }
    ],
    reels:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'Reel'
        }
    ],
    stories:[
         {
           type: mongoose.Schema.Types.ObjectId,
           ref:'Story'
        }
    ],
    followings:[
         {
           type: mongoose.Schema.Types.ObjectId,
           ref:'User',
        }
    ],
    followers:[
         {
           type: mongoose.Schema.Types.ObjectId,
           ref:'User',

        }
    ],
    postFeed:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'Post'
        }
    ],
    storyFeed:[
       /* {  
           type: mongoose.Schema.Types.ObjectId,
           ref:'User' ,
        },*/
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'Story', 
        }
    ],
    reelFeed:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'Reel'
        }
    ],
    activity:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'User',
        }
    ],
    requests:[
         {
           type: mongoose.Schema.Types.ObjectId,
           ref:'User',
        }
    ],
    typeOfAccount:{
        type:String,
        enum: ['Private', 'Public'],
        default:'Public'
    },
    bio:String,
    pfp:
    {
        type:String,
        default:"https://res.cloudinary.com/dsxredxry/image/upload/v1635842754/instagram-clone/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws_uhduyh.jpg"
    },
    resetPasswordToken:String,
    ressetPasswordExpire:Date,
})
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
//the schema method to match passwords
UserSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
//the schema method to get signed jwt token
UserSchema.methods.getSignedJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
//the schema method to get reset password token
UserSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.ressetPasswordExpire=Date.now()+10*(60*1000);
    return resetToken;
}
UserSchema.methods.setupMethod=function(username,bio,typeOfAccount,pfp){
    if(username!="")this.username=username;
    if(bio!="") this.bio=bio;
    if(typeOfAccount!="") this.typeOfAccount=typeOfAccount;
    if(pfp!="") this.pfp=pfp;
}
UserSchema.methods.addToRequests=function(ouserid){
    this.requests.push(ouserid);
}
UserSchema.methods.addToFollowers=function(ouserid){
    console.log(this.followers);
    this.followers.push(ouserid)
}
UserSchema.methods.addToFollowings=function(ouserid){
    console.log(this.followings);
    this.followings.push(ouserid);
}
UserSchema.methods.addToActivity=function(ouserid){
    this.activity.push(ouserid);
}
UserSchema.methods.getFollowers=function(){
    return this.followers;
}
UserSchema.methods.addToPosts=function(postid){
    this.posts.push(postid);
}
UserSchema.methods.addToPostFeed=function(postid){
    this.postFeed.push(postid);
}
UserSchema.methods.addToReels=function(reelid){
    this.reels.push(reelid);
}
UserSchema.methods.addToReelFeed=function(reelid){
    this.reelFeed.push(reelid);
}
UserSchema.methods.addToStories=function(storyid){
    this.stories.push(storyid);
}
UserSchema.methods.addToStoryFeed=function(storyid){
    this.storyFeed.push(storyid);
}
UserSchema.methods.deleteFromPostFeed=function(postid){
    let postfeed=this.postFeed;
    const index=postfeed.indexOf(postid);
    if(index>-1){
        postfeed.splice(index,1)
    }
    this.postfeed=postfeed;
}
UserSchema.methods.deleteFromPosts=function(postid){
     let allposts=this.posts;
    const index=allposts.indexOf(postid);
    if(index>-1){
        allposts.splice(index,1)
    }
    this.posts=allposts;
}
UserSchema.methods.deleteFromRequests=function(ouid){
      let allrequests=this.requests;
    const index=allrequests.indexOf(ouid);
    if(index>-1){
        allrequests.splice(index,1)
    }
    this.requests=allrequests;
}
UserSchema.methods.deleteFromActivity=function(ouid){
      let allactivity=this.activity;
    const index=allactivity.indexOf(ouid);
    if(index>-1){
        allactivity.splice(index,1)
    }
    this.activity=allactivity;
}
UserSchema.methods.getSuggestions=function(users,uid){
    let followings=this.followings;
    users=users.map((e)=>{
        if(!followings.includes(e._id) && e._id!=uid && !e.requests.includes(uid) && !e.activity.includes(uid)){
            let user={
                _id:e._id,
                pfp:e.pfp,
                username:e.username
            }
            return user;
        }
    })
   return users;
}
let User=mongoose.model("User",UserSchema);
module.exports=User;