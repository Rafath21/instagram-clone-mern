const Message=require('../../models/Message');
//get messages
exports.messages=async(req,res)=>{
 try {
    const msgs = await Message.find({
      chatId: req.params.chatId,
    }).populate({path:"sender",select:"username pfp _id"});
    res.status(200).json(msgs);
  } catch (err) {
    res.status(500).json(err);
  }
}
//post a message
exports.message=async(req,res)=>{
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
}