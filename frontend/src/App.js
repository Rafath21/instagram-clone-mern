import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Login from "./components/authComponents/Login";
import Register from "./components/authComponents/Register";
import Home from "./components/userComponents/Home";
import Setup from "./components/userComponents/Setup";
import Profile from "./components/userComponents/Profile";
import Reel from "./components/userComponents/Reel";
import Createstory from "./components/userComponents/Createstory";
import StoryComponent from "./components/userComponents/StoryComponent"
import Chats from "./components/userComponents/Chats";
import ChatWindow from "./components/userComponents/ChatWindow";
import {useEffect} from "react";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "./constants/authConstants";

function App() {
  let dispatch = useDispatch();
useEffect(()=>{
      const data=localStorage.getItem("user");
      const user=JSON.parse(data);
      if(data && Date.now()<user.expiry){
      console.log(user.expiry);
          dispatch({type:LOGIN_SUCCESS,payload:user.value});
      }else{
        localStorage.removeItem("user");
      }
     /* if(window.localStorage.getItem("user") ){
          dispatch({type:LOGIN_SUCCESS,payload:JSON.parse(window.localStorage.getItem("user"))});
      }*/
  },[])
  return (
    <>
      <Router>
          <Switch>
             <Route path="/register">
            <Register/>
          </Route>
           <Route path="/login">
            <Login/>
          </Route>
          <Route path="/setup">
            <Setup/>
          </Route>
           <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/reels">
            <Reel/>
          </Route>
          <Route path="/createstory">
            <Createstory/>
          </Route>
            <Route path="/:userid/story">
            <StoryComponent/>
          </Route>
            <Route path="/chats">
            <Chats/>
          </Route>
            <Route path="/chatwindow/:username">
            <ChatWindow/>
          </Route>
           <Route path="/">
            <Home/>
          </Route>
        </Switch>
    </Router>
    </>
  );
}
export default App;
