const mongoose = require('mongoose');
const Chat=require('../../models/Chat');
const Message=require('../../models/Chat');
//all chats of one single user
exports.allChats=async(req,res)=>{
  try {
    const chats = await Chat.find({
      members: { $in: [req.params.userid] },
    }).populate({path:'members', select:'username _id pfp'})
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
}
//create new chat
exports.newChat=async(req,res)=>{
const newChat= new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedChat = await newChat.save();
    console.log(savedChat);
    res.status(200).json(savedChat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
//get a conversation between two users
exports.getConvo=async(req,res)=>{
  let usersIds=[];
  let users=[];
  console.log("first userid:",req.params.firstuserid);
  console.log("second userid:",req.body.seconduserid);
  usersIds.push(req.params.firstuserid);
  usersIds.push(req.body.seconduserid);
  for(let i=0;i<usersIds.length;i++){
    users.push(new mongoose.Types.ObjectId(usersIds[i]))
  }
    try {
    const chat= await Chat.findOne({
      members: { $all: users },
    });
    console.log(chat);
    res.status(200).json(chat)
  } catch (err) {
    res.status(500).json(err);
  }
}