const io = require('./server.js').io;
let users=[];
const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId===userId) && 
    users.push({userId,socketId});
}

const removeUser=(socketId)=>{
    users=users.filter((user)=>user.socketId!==socketId);
}

const getUser=(userId)=>{
    return users.find((user)=>user.userId===userId)
}
module.exports=function(socket){
    console.log(socket.id);
    socket.on('addUser',(userId)=>{
        addUser(userId,socket.id);
        io.emit('getUsers',users);
    })
    console.log(users);
    socket.on('sendMessage',async({senderId,receiverId,text})=>{
        const user=getUser(receiverId);
        console.log("in send message:",user);
        io.to(user.socketId).emit('getMessage',{
            senderId,
            text,
        })
    })
    socket.on('disconnect',()=>{
        removeUser(socket.id);
        io.emit("getUsers",users);
    })
}

