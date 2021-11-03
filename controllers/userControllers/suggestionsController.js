const User=require("../../models/User");
exports.suggestions=async(req,res)=>{
    try{
    let curruserid=req.params.userid;
    let user=await User.findById(curruserid);
    let users=await User.find().select('id pfp username requests activity');
    let suggestions=user.getSuggestions(users,curruserid);
    res.status(200).json({
        suggestions
    })
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}