import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { firestore } from "../firebase";
import { AuthContext } from "../AuthProvider";
import firebase from "firebase/app";

import "../css/App.css";
let ChatWindow = () => {
  let [currMsg, setCurrMsg] = useState("");
  let value = useContext(AuthContext);
  const location = useLocation();
  let senderpfp = location.state.senderPfp;
  let senderUn = location.state.senderUn;
  let [msgs, setMsgs] = useState([]);
  let msgRef = useRef();

  useEffect(async () => {
    let unsubscription = await firestore
      .collection("users")
      .doc(value.uid)
      .collection("chats")
      .doc(location.state.senderUid)
      .onSnapshot((querySnapshot) => {
        setMsgs(querySnapshot.data()?.msgs);
      });
    return () => {
      unsubscription();
    };
  }, []);
  async function handleSendmsg() {
    msgRef.current.value = "";
    let msgId = value.uid + "msg" + Date.now();
    await firestore
      .collection("users")
      .doc(value.uid)
      .collection("chats")
      .doc(location.state.senderUid)
      .set(
        {
          senderPfp: senderpfp,
          senderUid: location.state.senderUid,
          senderUsername: senderUn,
          msgs: firebase.firestore.FieldValue.arrayUnion({
            chatId: msgId,
            msg: currMsg,
          }),
        },
        { merge: true }
      );
    await firestore
      .collection("users")
      .doc(location.state.senderUid)
      .collection("chats")
      .doc(value.uid)
      .set(
        {
          senderPfp: location.state.ownpfp,
          senderUid: location.state.ownUid,
          senderUsername: location.state.ownUsername,
          msgs: firebase.firestore.FieldValue.arrayUnion({
            chatId: msgId,
            msg: currMsg,
          }),
        },
        { merge: true }
      );
  }
  return (
    <div className="chat-window-container">
      <div className="chat-window-header">
        <Link
          to={{
            pathname: "/chats",
            state: {
              ownUid: location.state.ownUid,
              ownUsername: location.state.ownUsername,
              ownpfp: location.state.ownpfp,
            },
          }}
          style={{ textDecoration: "none" }}
        >
          <i class="fas fa-arrow-left" id="link"></i>
        </Link>
        <img src={senderpfp} />
        <h4>{senderUn}</h4>
      </div>
      <div className="chat-window-messages">
        {msgs?.map((e, index) => {
          let classname = "";
          if (e.chatId.split("msg")[0] == value.uid) {
            classname = "chat-message-own";
          } else {
            classname = "chat-message-sender";
          }
          return (
            <div className={classname} key={index}>
              <p>{e.msg}</p>
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
