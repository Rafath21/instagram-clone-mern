let User=require("../../models/User");
exports.deleteActivity=async(req,res)=>{
try{
        let curruserid=req.params.userid;
        let ouid=req.body.ouid;
        let user=await User.findById(curruserid);
        user.deleteFromActivity(ouid);
        await user.save();
        res.status(200).json({
            success:true,
            message:"Activity Deleted"
        })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}