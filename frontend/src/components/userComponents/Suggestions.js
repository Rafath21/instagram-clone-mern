import React from 'react';
import {  Link ,useHistory} from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import {sendRequest} from "../../actions/requestsActions"
import {logout} from "../../actions/authActions";
const Suggestions=()=> {
let history = useHistory();
  let dispatch = useDispatch();
  let [state,setState]=useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {allSuggestions}=useSelector((state)=>state.allSuggestions);
  const {followStatus}=useSelector((state)=>state.followStatus);
  console.log(allSuggestions);
return (
          <div className="sidebar-container">
      <div className="sidebar-profile">
        <img className="sidebar-pfp" src={user.pfp} />
        <Link
          to={{
            pathname: `/profile/${user.username}`,
            state: {
              uid: user._id,
            },
          }}
          style={{ textDecoration: "none" }}
        >
          <p className="sidebar-username">{user.username}</p>
        </Link>
        <button
          className="home-signout-btn"
          onClick={() => {
            dispatch(logout())
          }}
        >
          Sign Out
        </button>
      </div>
      <hr />

      <p className="suggestions-title">Suggestions</p>
      <div className="sidebar-suggestions-container">
        {allSuggestions?.map((element, index) => {
          if(element!=null){
            return (
            <div className="suggestion-inner" key={index}>
              <div className="suggestion-pfp">
                <img id="suggestion-pfp" src={element?.pfp} />
              </div>
              <Link
                to={{
                  pathname: `/profile/${element?.username}`,
                  state: {
                    uid: element?._id,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="suggestion-username">{element?.username}</div>
              </Link>
              <div>
                <button
                  className="suggestion-follow-btn" 
                  onClick={async (e) => {
                  e.preventDefault();
                  console.log(element?.typeOfAccount);
                  if(element?.typeOfAccount=="Private"){
                    e.target.innerText="Requested"
                  }else{
                    e.target.innerText="Following"
                  }
                  e.target.disabled=true;
                  dispatch(sendRequest(user._id,element._id));
                  setState(true)
                  }}
                >
                  Follow
                </button>
              </div>
            </div>
          );
          }
          
        })}
      </div>
    </div>
    )
}

export default Suggestions;