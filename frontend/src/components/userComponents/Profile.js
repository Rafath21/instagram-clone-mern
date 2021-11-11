import React, { useEffect, useState} from "react";
import { useLocation, Link,useHistory } from "react-router-dom";
import "../../css/App.css";
import Postcard from "./PostCard";
import {getProfile} from "../../actions/profileActions"
import Profileloader from "../../Loaders/Profileloader";
import { useSelector, useDispatch } from "react-redux";
import {sendRequest} from "../../actions/requestsActions";
const Profile=(props)=>{
  let history=useHistory();
  const location = useLocation();
  let dispatch = useDispatch();
  let {user}=useSelector((state)=>state.user);
  let {followStatus}=useSelector((state)=>state.followStatus);
  let {profile}=useSelector((state)=>state.profile)
  let [loading, setLoading] = useState(true);
  let [followsBoxOpen, setfollowsBoxOpen] = useState(false);
  let [followersBoxOpen, setfollowersBoxOpen] = useState(false);
  let [ownProfile, setownProfile] = useState(false);
  let [post, setPost] = useState({
    caption: "",
    comments: [],
    likes: [],
    posturl: "",
    _id: "",
    postedBy:{},
  });
  const [modal, setModal] = useState({
    isOpen: false,
    postId: "",
  });
  useEffect(()=>{
    if(user._id==location.state.uid){
        setownProfile(true);
    }  
    dispatch(getProfile(user._id,location.state.uid));
    setLoading(false);
  },[followStatus,dispatch,history,location.state.uid])
  return (
    <>
      {loading ? (
        <Profileloader />
      ) : (
        <div className="profile-main-container">
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-subheader">
                <img className="profile-pfp" src={profile?.pfp} />
                <div className="profile-details">
                  <p className="profile-username">{profile?.username}</p>
                  <div className="posts-followers-following-container">
                    <p className="profile-posts-number">
                      <b>{profile?.postsCount}</b> Posts
                    </p>
                    <p
                      className="profile-followers-number"
                      onClick={() => {
                        setfollowersBoxOpen(true);
                      }}
                    >
                      <b>{profile?.followersCount}</b> Followers
                    </p>
                    <p
                      className="profile-following-number"
                      onClick={() => {
                        setfollowsBoxOpen(true);
                      }}
                    >
                      <b>{profile?.followingsCount}</b> Following
                    </p>
                  </div>
                  {ownProfile ? (
                    <Link to={{ pathname: "/setup" }}>
                      <div className="edit-profile-btn">Edit profile</div>
                    </Link>
                  ) : (
                    <div className="two-btns">
                      <Link
                        to={{
                          pathname: `/chatwindow/${profile?.username}`,
                          state: {
                            otheruser:profile
                          },
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <button className="profile-sendMsg">
                          Send Message
                        </button>
                      </Link>
                      <button
                        className="follow-status"
                        onClick={(e) => {
                        e.preventDefault();
                          if (profile.followStatus != "Following") {
                            dispatch(sendRequest(user?._id,location.state.uid));
                          }
                        }}
                      >
                        {profile?.followStatus}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-bio">{profile?.bio}</div>
            </div>
            {followersBoxOpen  && profile.status=="allowed"?(
              <div className="followers-box-container">
                <div className="followers-box-header">
                  <i
                    class="fas fa-arrow-left"
                    id="followers-back"
                    onClick={() => {
                      setfollowersBoxOpen(false);
                    }}
                  ></i>
                  <p className="followers-heading">Followers</p>
                  <hr></hr>
                </div>
                <div className="followers-container">
                  {profile?.followers.map((e, index) => {
                    return (
                      <div className="followers-inner" key={index}>
                        <img src={e.pfp} alt="" className="followers-pfp" />
                        <p className="follower-username">{e.username}</p>
                        <hr></hr>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            {followsBoxOpen && profile.status=="allowed"?(
              <div className="follows-box-container">
                <div className="follows-box-header">
                  <i
                    id="follows-back"
                    class="fas fa-arrow-left"
                    onClick={() => {
                      setfollowsBoxOpen(false);
                    }}
                  ></i>
                  <p className="follows-heading">Following</p>
                  <hr></hr>
                </div>
                <div className="followers-container">
                  {profile?.followings.map((e, index) => {
                    return (
                      <div className="follows-inner" key={index}>
                        <img src={e.pfp} alt="" className="follows-pfp" />
                        <p className="follows-username">{e.username}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="profile-posts-container">
              <p className="posts-title">POSTS</p>
              <hr />
              {profile?.status=="allowed" ? (
                <div className="profile-posts">
                  {profile?.posts.map((e, index) => {
                    return (
                      <img
                        className="profile-post"
                        key={index}
                        src={e.posturl}
                        onClick={async () => {
                          setModal({
                            isOpen: true,
                            postId: e._id,
                          });
                          setPost({
                            ...post,
                            posturl:e.posturl,
                            _id:e._id,
                            caption:e.caption,
                            likes:e.likes,
                            postedBy:e.postedBy,
                            comments:e.comments
                          });
                        }}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="acc-is-private">This Account is private</div>
              )}
            </div>
          </div>
          {modal.isOpen && (
            <div className="main-post-card-container">
              <i
                class="fas fa-arrow-left"
                id="back-btn"
                onClick={() => {
                  if (modal.isOpen) setModal({ isOpen: false });
                }}
              ></i>
              <Postcard
                post={post}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Profile;