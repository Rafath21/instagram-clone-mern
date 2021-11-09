import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation,useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "../../css/App.css";
import { io } from "socket.io-client";
import { format } from "timeago.js";
let ChatWindow = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  let [chatId,setChatId]=useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  let [currMsg, setCurrMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef=useRef();
  const location = useLocation();
  let otheruser=location.state.otheruser;
  let [msgs, setMsgs] = useState([]);
  let msgRef = useRef();
     useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);
  useEffect(() => {
    socket.current = io("ws://localhost:7000");
    console.log(socket);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  console.log(msgs);
   useEffect(() => {
    if(arrivalMessage && arrivalMessage?.sender==user?._id || arrivalMessage?.sender==otheruser?._id )
    /*const newMessage={
      senderId=arrivalMessage.senderId,
    }*/
    setMsgs((prev) => [...prev, arrivalMessage.text]);
    console.log("arrival message:",arrivalMessage);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
  }, [user]);
useEffect(async () => {
   getChat();
  }, [history,location,otheruser]);
async function getChat(){
 try{
    let data=axios({
          method:'post',
          url:`http://localhost:7000/api/v1/chats/convo/${user._id}`,
          data:{
             seconduserid:otheruser._id,
          },
          withCredentials:true,
      }).then((res)=>{
        console.log("getchat data:",res);
        if(res.data!=null){
        setChatId(res.data._id);
        console.log(res.data._id);
        getAllMsgs(res.data._id)
        }else{
         createChat();
        }
      })
   }catch(err){
       console.log(err);
   }
  }
async  function getAllMsgs(id){
  console.log("in get all msgs:",id);
    let data=await axios({
          method:'GET',
          url:`http://localhost:7000/api/v1/messages/${id}`,
          withCredentials:true,
      })
      console.log(data.data);
      setMsgs(data.data);
}
async function createChat(){
    //create a chat first
    console.log("in create chat");
        let createChatData=await axios({
            method:'POST',
            url:`http://localhost:7000/api/v1/chats`,
            withCredentials:true,
            data:{
                senderId:user?._id,
                receiverId:otheruser._id
        }
    })
    console.log("create chat data:",createChatData);
    setChatId(createChatData.data._id);
  }
async function sendMessage(){
//post a message
  if(chatId!==""){
let obj={
         chatId:chatId,
         sender:{
           pfp:user?.pfp,
           username:user?.username,
           _id:user?._id
         },
         message:currMsg
}
console.log(obj);
setMsgs([...msgs,obj]);
const receiverId = otheruser?._id
obj.receiverId=receiverId;
      socket.current.emit("sendMessage", {
       obj
      });
 let postMsg=await axios({
     method:'POST',
     url:`http://localhost:7000/api/v1/messages`,
     withCredentials:true,
     data:{
         chatId:chatId,
         sender:user?._id,
         message:currMsg
      }
      })
      console.log("send msg data:",postMsg);
}
}
async function handleSendmsg() {
    msgRef.current.value = "";
    const message = {
      sender: user?._id,
      text: currMsg,
      chatId: chatId,
    };
    
    sendMessage();
}
  return (
    <div className="chat-window-container">
      <div className="chat-window-header">
        <Link
          to={{
            pathname: "/chats",
          }}
          style={{ textDecoration: "none" }}
        >
          <i class="fas fa-arrow-left" id="link"></i>
        </Link>
        <img src={otheruser.pfp} />
        <Link id="link"
          to={{
            pathname: `/profile/${otheruser?.username}`,
            state: {
              uid: otheruser?._id,
            },
          }}

          style={{ textDecoration: "none" }}
        >
        <h4>{otheruser.username}</h4>
        </Link>
      </div>
      <div className="chat-window-messages">
        {msgs?.map((e, index) => {
        let classname = "";
         if(e.sender._id===user?._id){
            classname = "chat-message-own";
         }else{
            classname = "chat-message-sender";
          }
         return (
           <>
            <div className={classname} key={index} ref={scrollRef}>
              <p>{e.message}</p>
              <span className="message-timestamp">{format(e.createdAt)}</span>
            </div>
            </>
          );
        })}
      </div>
      <div className="chat-window-msgform">
        <textarea
          ref={msgRef}
          type="text"
          onChange={(e) => {
            setCurrMsg(e.target.value);
          }}
        ></textarea>
        <button onClick={handleSendmsg}>Send</button>
      </div>
    </div>
  );
};
export default ChatWindow;