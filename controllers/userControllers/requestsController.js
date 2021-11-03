const User=require("../../models/User");
exports.handleRequests=async(req,res)=>{
    try{
      let ouserid=req.body.ouid; //other user's id
      let curruserid=req.params.userid
    let curruser=await User.findById(curruserid);
        let otheruser=await User.findById(ouserid);
        console.log(curruser);
        console.log(otheruser);
        if(otheruser.typeOfAccount==="Private"){
            console.log("in private")
            otheruser.addToRequests(curruserid)
            await otheruser.save();
            res.status(200).json({
                success:true,
                followStatus:"Requested"
            })
        }else{
            otheruser.addToActivity(curruserid);
            otheruser.addToFollowers(curruserid);
            await otheruser.save();
            curruser.addToFollowings(ouserid);
            await curruser.save();
           res.status(200).json({
                success:true,
                followStatus:"Following"
            })
        }
    
}catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}
//when curr user accepts other user's follow request
exports.acceptRequest=async(req,res)=>{
    try{
    let curruserid=req.params.userid;
    let otheruserid=req.body.ouid;
    let curruser=await User.findById(curruserid);
    let otheruser=await User.findById(otheruserid);
    console.log(curruser);
    console.log(otheruser);
    curruser.addToFollowers(otheruserid);
    await curruser.save();
    otheruser.addToFollowings(curruserid);
    await otheruser.save();
    //remove from activity also
    res.status(200).json({
        success:true,
        message:"Successfully accepted!!"
    })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
   

}
exports.deleteRequest=async(req,res)=>{
    try{
        let curruserid=req.params.userid;
        let ouid=req.body.ouid;
        let user=await User.findById(curruserid);
        user.deleteFromRequests(ouid);
        await user.save();
        res.status(200).json({
            success:true,
            message:"Request Deleted"
        })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}