const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema( {
    chatId: {
      type: String,
    },
    sender: {
           type: mongoose.Schema.Types.ObjectId,
           ref:'User',
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);
const Message=mongoose.model('Message',messageSchema);
module.exports=Message;
