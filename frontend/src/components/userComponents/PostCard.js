import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState ,useEffect,useRef} from "react";
import { Link,useLocation } from "react-router-dom";
import axios from "axios";
import "../../css/App.css";
import {likePost, commentPost } from "../../actions/postActions";
let Postcard = (props) => {
  let location=useLocation();
  let dispatch = useDispatch();
  let {user}=useSelector((state)=>state.user);
  let [comments, setComments] = useState([]);
  let [likes, setLikes] = useState(0);
  let [currUserLike, setCurrUserLike] = useState(false);
  let [currUserComment, setcurrUserComment] = useState("");
  let [commentBoxOpen, setcommentBoxOpen] = useState(false);
  let [currProfile,setCurrProfile]=useState(false);
  let commentRef = useRef();
  let commentsRef = useRef();
     useEffect(() => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);
  function clearComment() {
    commentRef.current.value = "";
  }
  useEffect(() => {
    let f = async () => {
      setComments(props.post.comments);
      setLikes(props.post.likes?.length);
      if (props.post.likes?.includes(user?._id)) {
        setCurrUserLike(true);
      }
    };
    f();
  }, []);
  function deleteHandler(e,postid){
    console.log(postid);
    e.preventDefault();
   axios({
      method: 'DELETE',
      url: `/api/v1/post/delete/${user?._id}`,
      withCredentials: true,
      data:{
         postid:postid
      },
      headers:{"Content-type":"Application/json"}
    }).then((res)=>{
      window.location.reload(false);
    }).catch((err)=>{
      alert("Some error occured!");
    })
}
useEffect(()=>{
  if(location.pathname.includes("/profile") && location.pathname.includes(`/${user?.username}`)){
    setCurrProfile(true);
  }
},[])
  return (
    <div className="post-card-container">
      <div className="post-card-header">
        <img className="post-img" src={props.post.postedBy.pfp}></img>
        <Link
          to={{
            pathname: `/profile/${props.post?.postedBy.username}`,
            state: {
              uid: props.post.postedBy._id,
            },
          }}
          style={{ textDecoration: "none" }}
        >
          <p className="post-username">{props.post?.postedBy.username}</p>
        </Link>
        {currProfile?(
          <button className="post-delete-btn" onClick={(e)=>
            deleteHandler(e,props.post?._id)}>Delete</button>
        ):""
      }
        
      </div>
      <div className="post-photo">
        <img id="post-pic" src={props.post?.posturl} />
      </div>
      <div className="post-card-likes-comments">
        <div className="post-liking-commenting">
          <div
            className="post-like"
            onClick={async () => {
              dispatch(likePost(user?._id, props.post?._id));
              if (currUserLike == false) setCurrUserLike(true);
              else setCurrUserLike(false);
            }}
          >
            {currUserLike ? (
              <i class="fa fa-heart" id="heart-icon-like"></i>
            ) : (
              <i class="far fa-heart" id="heart-icon-likes"></i>
            )}
          </div>
          <i
            class="far fa-comment"
            id="comment-icon"
            onClick={() => {
              setcommentBoxOpen(true);
            }}
          ></i>
        </div>
        <div className="post-likes-number">
          {props.post?.likes.length} likes
        </div>
        <div className="post-username-and-caption-container">
          <Link
            to={{
              pathname: `/profile/${props.post.postedBy.username}`,
              state: {
                uid: props.post.postedBy._id,
              },
            }}
            style={{ textDecoration: "none" }}
          >
            <p className="post-username-bottom">{props.post.postedBy.username}</p>
          </Link>

          <p className="post-caption">{props.post.caption}</p>
        </div>
        {commentBoxOpen ? (
          <div className="post-comment-form-container">
            <div className="comment-form-header">
              <i
                class="fas fa-arrow-left"
                onClick={() => {
                  if (commentBoxOpen) setcommentBoxOpen(false);
                }}
              ></i>
              <p className="comment-title">Comments</p>
            </div>
            <div className="comment-form-comments">
              {comments?.map((e, index) => {
                return (
                  <div className="comment-form-inner" key={index} ref={commentsRef}>
                    <img className="comment-pfp" src={e.userid.pfp} />
                    <Link
                      to={{
                        pathname: `/profile/${e.userid.username}`,
                        state: {
                          uid: e.userid._id,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <p className="comment-username">{e.userid.username}</p>
                    </Link>
                    <p className="post-comment">{e.comment}</p>
                  </div>
                );
              })}
            </div>

            <div className="comment-form">
              <textarea
                ref={commentRef}
                className="user-comment"
                onChange={(e) => {
                  setcurrUserComment(e.currentTarget.value);
                }}
              ></textarea>
              <button
                className="user-comment-post-button"
                onClick={async () => {
                  clearComment();
                  dispatch(commentPost(user?._id, currUserComment, props.post?._id));
                  let arr = [];
                  arr = [...comments];
                  arr.push({
                    userid: {
                      _id: user._id,
                      username: user.username,
                      pfp: user.pfp,
                    },
                    comment: currUserComment,
                  });
                  setComments(arr);
                }}
              >
                POST
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="post-comments-container">
          {comments?.length <= 1 ? (
            comments?.map((e, index) => {
              return (
                <div className="post-comments-inner" key={index}>
                  <Link
                    to={{
                      pathname: `/profile/${e.userid.username}`,
                      state: {
                        uid: e.userid._id,
                      },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <p className="comment-username">{e.userid.username}</p>
                  </Link>
                  <p className="post-comment">{e.comment}</p>
                </div>
              );
            })
          ) : (
            <>
              <p
                className="show-comments-title"
                onClick={() => {
                  setcommentBoxOpen(true);
                }}
              >
                Show Comments
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Postcard;