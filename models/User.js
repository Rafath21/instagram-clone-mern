const mongoose=require('mongoose');
const crypto=require("crypto");
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');
let UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"]
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
           ref:'posts'
        }
    ],
    reels:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'reels'
        }
    ],
    stories:[
         {
           type: mongoose.Schema.Types.ObjectId,
           ref:'stories'
        }
    ],
    followings:[
         {
           type: mongoose.Schema.Types.ObjectId,
           ref:'users'
        }
    ],
    followers:[
         {
           type: mongoose.Schema.Types.ObjectId,
           ref:'users'
        }
    ],
    suggestions:[
         {
           type: mongoose.Schema.Types.ObjectId,
           ref:'users'
        }
    ],
    postFeed:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'posts'
        }
    ],
    storyFeed:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'stories'
        }
    ],
    reelFeed:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'reels'
        }
    ],
    activity:[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'users'
        }
    ],
    typeOfAccount:{
        type:String,
        enum: ['Private', 'Public'],
        default:'Public'
    },
    bio:String,
    pfp:{
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
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

let User=mongoose.model("User",UserSchema);
module.exports=User;