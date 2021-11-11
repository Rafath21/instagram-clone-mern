import { useState, useEffect, useRef } from "react";
import { Link, useLocation,useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "../../css/App.css";
import { format } from "timeago.js";
let ChatWindow = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  let [chatId,setChatId]=useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  let [currMsg, setCurrMsg] = useState("");
  const scrollRef=useRef();
  const location = useLocation();
  let otheruser=location.state.otheruser;
  let [msgs, setMsgs] = useState([]);
  let msgRef = useRef();
     useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

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
        if(res.data!=null){
        setChatId(res.data._id);
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
    let data=await axios({
          method:'GET',
          url:`http://localhost:7000/api/v1/messages/${id}`,
          withCredentials:true,
      })
      setMsgs(data.data);
}
async function createChat(){
    //create a chat first
        let createChatData=await axios({
            method:'POST',
            url:`http://localhost:7000/api/v1/chats`,
            withCredentials:true,
            data:{
                senderId:user?._id,
                receiverId:otheruser._id
        }
    })
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
setMsgs([...msgs,obj]);
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
}
}
async function handleSendmsg() {
    msgRef.current.value = "";
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