import "../../css/App.css";
import { Link, useLocation ,useHistory} from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import Chatloader from "../../Loaders/Chatsloader";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
let Chats = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  let [allChats, setAllChats] = useState([]);
  let location = useLocation();
  let [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    let {data}=  await axios({
          method:'GET',
          url:`http://localhost:7000/api/v1/chats/${user?._id}`
      })
    console.log(data);
    setAllChats(data);
    setLoading(false);
  }, [user,history]);
  console.log(allChats);
  return (
    <>
      {loading ? (
        <Chatloader />
      ) : (
        <div className="chats-container">
          <div className="chats-header">
            <Link to="home">
              <i class="fas fa-arrow-left" id="link"></i>
            </Link>
            <h3>Chats</h3>
            <hr></hr>
          </div>
          <div className="chats">
            {allChats?.map((e, index) => {
                let otheruser=e.members.find((c)=>c._id!==user?._id);
              return (
                <>
                  <Link
                    to={{
                      pathname: `/chatwindow/${otheruser.username}`,
                      state: {
                       otheruser:otheruser
                      },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="chat" id="link" key={index}>
                      <img src={otheruser.pfp} />
                      <h4>{otheruser.username}</h4>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Chats;