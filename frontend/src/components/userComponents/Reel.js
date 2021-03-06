import { useState, useEffect, useRef } from "react";
import "../../css/App.css";
import VideoCard from "./VideoCard";
import ReelsLoader from "../../Loaders/ReelsLoader";
import { createReel } from "../../actions/reelActions";
import { useSelector, useDispatch } from "react-redux";
import {reelfeed} from "../../actions/feedActions"
import {useHistory} from "react-router-dom";
let Reel = () => {
  let history=useHistory();
  let dispatch=useDispatch();
  const {feedReels}=useSelector((state)=>state.feedReels);
  const {isReelCreated}=useSelector((state)=>state.isReelCreated);
  let [loading, setLoading] = useState(false);
  let [createReelOpen, setCreateReelOpen] = useState(false);
  let [uploadFile, setuploadFile] = useState("");
  let [uploadCaption, setuploadCaption] = useState("");
  let captionRef = useRef();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  function captionClear() {
    captionRef.current.value = "";
  }
  useEffect(()=>{
    setLoading(false);
  },[isReelCreated])
  useEffect(async () => {
    setLoading(true);
    dispatch(reelfeed(user?._id));
    setLoading(false);
}, [history,dispatch,isReelCreated]);
  return (
    <>
      {loading ? (
        <ReelsLoader />
      ) : (
        <div className="reels-container">
          {feedReels?.length > 0 ? (
            feedReels?.map((reel, index) => {
              return (
                <VideoCard
                  reel={reel}
                  key={index}
                />
              );
            })
          ) : (
            <div className="no-reels-container">
              <h1>No reels! Please follow people on IC to watch reels 😍</h1>
              <button
                onClick={() => {
                  setCreateReelOpen(true);
                }}
              >
                Create Reel
              </button>
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
                      setLoading(true);
                    }}
                  >
                    POST
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Reel;