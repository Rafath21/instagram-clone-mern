import { useEffect, useState, useRef } from "react";
import "../../css/App.css";
import { Link } from "react-router-dom";
import ReelsLoader from "../../Loaders/ReelsLoader";
import "../../css/reels.css";
import {likeReel, commentReel } from "../../actions/reelActions";
import { createReel } from "../../actions/reelActions";
import { useSelector, useDispatch } from "react-redux";
let VideoCard = (props) => {
  let dispatch=useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {isReelCommentUpdated}=useSelector((state)=>state.isReelCommentUpdated);
  let [commentboxOpen, setCommentBoxOpen] = useState(false);
  let [playing, setPlaying] = useState(true);
  let [createReelOpen, setCreateReelOpen] = useState(false);
  let [uploadFile, setuploadFile] = useState("");
  let [uploadCaption, setuploadCaption] = useState("");
  let [currUserComment, setcurrUserComment] = useState("");
  let [currUserLike, setCurrUserlike] = useState(false);
  let [loading, setLoading] = useState(false);
  let videoRef = useRef();
  let captionRef = useRef();
  let commentRef = useRef();
  let [comments,setComments]=useState([]);
   let commentsRef = useRef();
     useEffect(() => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);
  function captionClear() {
    captionRef.current.value = "";
  }
  function commentClear() {
    commentRef.current.value = "";
  }
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const callbackFunction = (entries) => {
    const [entry] = entries;
    if (entry.isIntersection) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    const currentTarget = videoRef.current;
    if (currentTarget) observer.observe(currentTarget);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [videoRef]);
  useEffect(async () => {
    setLoading(true);
    setComments(props.reel?.comments);
    if (props.reel.likes?.includes(user?._id)) {
      setCurrUserlike(true);
    }
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <ReelsLoader />
      ) : (
        <div className="video-card">
          <>
            <video
              ref={videoRef}
              onClick={(e) => {
                if (playing) {
                  setPlaying(false);
                  e.currentTarget.pause();
                } else {
                  setPlaying(true);
                  e.currentTarget.play();
                }
              }}
              src={props.reel?.reelurl}
            ></video>
            <div className="reels-actions">
              <div className="actions">
                <div
                  className="reel-like"
                  onClick={() => {
                    if (currUserLike) setCurrUserlike(false);
                    else setCurrUserlike(true);
                   dispatch(likeReel(user?._id, props.reel?._id));
                 }}
                >
                  {currUserLike ? (
                    <i class="fa fa-heart" id="heart-icon-like"></i>
                  ) : (
                    <i class="far fa-heart" id="heart-icon-likes"></i>
                  )}
                </div>
                <i
                  class="fas fa-comments"
                  id="reels-comments-icon"
                  onClick={() => {
                    if (commentboxOpen) setCommentBoxOpen(false);
                    else setCommentBoxOpen(true);
                  }}
                ></i>
                <i
                  class="far fa-plus-square"
                  id="create-reel"
                  onClick={(e) => {
                    setCreateReelOpen(true);
                  }}
                ></i>
              </div>
              <h4>{props.reel.likes?.length} likes</h4>
              <div className="username-pfp-container">
                <Link
                  to={{
                    pathname: `/profile/${props.reel.postedBy.username}`,
                    state: {
                      uid: props.reel?.postedBy._id,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <img src={props.reel.postedBy.pfp} />
                  <p className="username">
                    <b>{props.reel.postedBy.username}</b>
                  </p>
                </Link>
                <span>{props.reel.caption}</span>
              </div>
              <p className="song">
                <i class="fas fa-music"></i>
                <marquee>Original Audio</marquee>
              </p>
            </div>
          </>

          {createReelOpen ? (
            <div className="create-reel-container">
              <i
                class="far fa-times-circle"
                id="create-reel-container-close"
                onClick={() => {
                  setCreateReelOpen(false);
                }}
              ></i>
              <p className="create-reel-heading">Create New Reel</p>
              <input
                type="file"
                className="create-post-input"
                accept="video/*"
                onClick={(e) => {
                  e.target.value = null;
                }}
                onChange={(e) => {
                   if (!e.target.files[0]) return;
                      let size = e.target.files[0].size;
                      if (size > 15728640) {
                        alert(
                          "Sorry! The video size cannot be more than 15mb😅"
                        );
                        e.target.value = null;
                      }
                      const reader=new FileReader();
                      reader.onload=()=>{
                          if(reader.readyState===2){
                              setuploadFile(reader.result);
                          }
                      }
                      reader.readAsDataURL(e.target.files[0]);
                }}
              />
              <p className="create-reel-caption-heading">
                Write your caption here...
              </p>
              <textarea
                ref={captionRef}
                type="text"
                className="create-reel-caption"
                onChange={(e) => {
                  let caption = e.currentTarget.value;
                  setuploadCaption(caption);
                }}
              ></textarea>
              <button
                className="create-new-reel-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.currentTarget.value = "Posting..";
                  captionClear();
                  dispatch(createReel(user?._id,uploadFile,uploadCaption))
                  setTimeout(() => {
                  setCreateReelOpen(false);
                  }, 4000);
                }}
              >
                POST
              </button>
            </div>
          ) : (
            ""
          )}
          {commentboxOpen ? (
            <div className="reels-comments-container">
              <div className="reels-comments-header">
                <i
                  class="fas fa-arrow-left"
                  onClick={() => {
                    if (commentboxOpen) setCommentBoxOpen(false);
                  }}
                ></i>
                <h3>Comments</h3>
              </div>
              <div className="reel-comments">
                {comments?.map((element, index) => {
                  return (
                    <div className="reel-comments-inner" key={index} ref={commentsRef}>
                      <Link
                        to={{
                          pathname: `/profile/${element.userid.username}`,
                          state: {
                            uid: element?.userid._id,
                          },
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <img src={element.userid.pfp} />
                        <h5>{element.userid.username}</h5>
                      </Link>
                      <p>{element.comment}</p>
                    </div>
                  );
                })}
              </div>
              <div className="reel-comment-form">
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
                    commentClear();
                  dispatch(commentReel(user?._id, currUserComment, props.reel?._id));
                  let arr = [];
                  arr = [...comments];
                  arr.push({
                    userid: {
                      _id: user?._id,
                      username: user?.username,
                      pfp: user?.pfp,
                    },
                    comment: currUserComment,
                  });
                  setcurrUserComment("");
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
        </div>
      )}
    </>
  );
};
export default VideoCard;