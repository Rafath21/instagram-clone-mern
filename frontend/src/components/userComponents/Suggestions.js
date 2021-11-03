import React from 'react';
import { Redirect, Link ,useHistory} from "react-router-dom";
import { useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {getProfile} from "../../actions/profileActions";
import {sendRequest} from "../../actions/requestsActions"
import {logout} from "../../actions/authActions";
const Suggestions=()=> {
let history = useHistory();
  let dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {allSuggestions}=useSelector((state)=>state.allSuggestions);
  const {followStatus}=useSelector((state)=>state.followStatus)
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
            logout()
          }}
        >
          Sign Out
        </button>
      </div>
      <hr />

      <p className="suggestions-title">Suggestions</p>
      <div className="sidebar-suggestions-container">
        {allSuggestions.map((element, index) => {
          return (
            <div className="suggestion-inner" key={index}>
              <div className="suggestion-pfp">
                <img id="suggestion-pfp" src={element.pfp} />
              </div>
              <Link
                to={{
                  pathname: `/profile/${element.username}`,
                  state: {
                    uid: element._id,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="suggestion-username">{element.username}</div>
              </Link>
              <div>
                <button
                  className="suggestion-follow-btn"
                  onClick={async (e) => {
                   e.preventDefault();
                    sendRequest(user._id,element._id);
                    e.target.value=followStatus
                  }}
                >
                  Follow
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    )
}

export const Suggestions