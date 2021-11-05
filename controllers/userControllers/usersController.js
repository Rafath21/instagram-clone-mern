let User=require("../../models/User");
exports.users=async(req,res)=>{
    try{
        let users=await User.find().select('username _id pfp');
        res.status(200).json({
            users
        })
    }catch(err){
        res.status(400).json(err);
    }
}