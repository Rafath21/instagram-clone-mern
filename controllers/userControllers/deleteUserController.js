const User=require('../../models/User');
exports.deleteUser=async(req,res)=>{
  try {
    await User.findById(req.params.userid).remove();
    res.status(200).json({
        success:true
    });
  } catch (err) {
    res.status(500).json(err);
  }
}