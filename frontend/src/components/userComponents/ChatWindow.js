import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation,useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "../../css/App.css";
let ChatWindow = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  let [chatId,setChatId]=useState("");
  let [chatIdCreated,setChatIdCreated]=useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  let [currMsg, setCurrMsg] = useState("");
  const location = useLocation();
let otheruser=location.state.otheruser;
  let [msgs, setMsgs] = useState([]);
  let msgRef = useRef();
useEffect(async () => {
    console.log("use effect fired");
   getChat();
  }, [history,location,otheruser]);
  console.log(otheruser._id);
async function getChat(){
 try{
    let data=await axios({
          method:'post',
          url:`http://localhost:7000/api/v1/chats/convo/${user._id}`,
          data:{
             seconduserid:otheruser._id,
          },
          withCredentials:true,
      })
      console.log("getchat data:",data);
    if(data.data!=null){
        setChatId(data.data_id);
        setChatIdCreated(true);
        getAllMsgs()
     }
     else{
         createChat();
     }
   }catch(err){
       console.log(err);
   }
  }
async  function getAllMsgs(){
    let data=await axios({
          method:'GET',
          url:`http://localhost:7000/api/v1/messages/${chatId}`,
          withCredentials:true,
      })
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
        <h4>{otheruser.username}</h4>
      </div>
      <div className="chat-window-messages">
        {msgs?.map((e, index) => {
          let classname = "";
         /* if (e.chatId.split("msg")[0] == value.uid) {
            classname = "chat-message-own";
          } else {
            classname = "chat-message-sender";
          }*/
          return (
            <div className={classname} key={index}>
              <p></p>
            </div>
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