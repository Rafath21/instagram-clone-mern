import { Redirect } from "react-router-dom";
import "../css/App.css";
import { useEffect, useContext, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/Responsive.css";
import HomeLoader from "../Loaders/HomeLoader";
let Home = (props) => {
  let [userName, setUserName] = useState("");
  let [pfpUrl, setpfpUrl] = useState("");
  let [reqOpen, setreqOpen] = useState(false);
  let [createBoxOpen, setcreateBoxOpen] = useState(false);
  let [allRequests, setRequests] = useState([]);
  let [typeOfAccount, settypeOfAccount] = useState("");
  let [uploadFilename, setuploadFilename] = useState("");
  let [uploadFile, setuploadFile] = useState("");
  let [uploadCaption, setuploadCaption] = useState("");
  let postCapref = useRef();
  let [feedPosts, setfeedPosts] = useState([]);
  let [searchValue, setsearchValue] = useState("");
  let [notificationCount, setnotificationCount] = useState("");
  let history = useHistory();
  let [storiesArr, setStoriesArr] = useState([]);
  let [messagesCount, setmessagesCount] = useState(0);
  let [suggestionsOpen, setSuggestionsOpen] = useState(false);
  let [searchSuggOpen, setSearchSuggOpen] = useState(false);
  let [searchSugg, setSearchSugg] = useState([]);
  let [searchUid, setsearchUid] = useState(null);
  let [loading, setLoading] = useState(true);
  let [ownStories, setOwnStories] = useState([]);
  let [allUsers, setallUsers] = useState([
    {
      uid: "",
      username: "",
      pfpUrl: "",
    },
  ]);
  return (
    <>
      {loading ? (
        <HomeLoader />
      ) : (
        <div className="home-container">
          <div className="home-header">
            <Link id="link" to="/home">
              <div className="home-header-title" id="header">
                Instagram-clone
              </div>
            </Link>
            <div className="header-search-box">
              <input
                className="header-search-input"
                type="text"
                placeholder="Who are you looking for?"
                onChange={(e) => {
                  if (e.target.value.length == 0) setSearchSuggOpen(false);
                  else setSearchSuggOpen(true);
                  setsearchValue(e.target.value);
                }}
              />

              <i class="fas fa-search" id="search-icon"></i>
              {searchSuggOpen ? (
                <div className="search-suggestions">
                  {searchSugg.map((suggestion) => {
                    return (
                      <>
                        <Link
                          id="link"
                          to={{
                            pathname: `/profile/${suggestion.username}`,
                            state: { uid: suggestion.uid },
                          }}
                        >
                          <div className="search-suggestion">
                            <img src={suggestion.pfpUrl} />
                            <p>{suggestion.username}</p>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              <i
                class="fas fa-comments"
                id="suggestions-icon"
                onClick={() => {
                  setSuggestionsOpen(true);
                }}
              >
                Suggestions
              </i>
            </div>
            <div className="other-icons">
              <i
                class="far fa-plus-square"
                id="plus-icon"
                title="Create post"
                onClick={() => {
                  if (createBoxOpen) setcreateBoxOpen(false);
                  else setcreateBoxOpen(true);
                }}
              ></i>
              {createBoxOpen ? (
                <div className="create-post-container">
                  <i
                    class="far fa-times-circle"
                    id="create-post-container-close"
                    onClick={() => {
                      setcreateBoxOpen(false);
                    }}
                  ></i>
                  <p className="create-post-heading">Create New Post</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="create-post-input"
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    onChange={(e) => {
                      if (!e.target.files[0]) return;
                      setuploadFilename(e.target.files[0].name);
                      setuploadFile(e.target.files[0]);
                    }}
                  />
                  <p className="create-post-caption-heading">
                    Write your caption here...
                  </p>
                  <textarea
                    ref={postCapref}
                    type="text"
                    className="create-post-caption"
                    onChange={(e) => {
                      let caption = e.currentTarget.value;
                      setuploadCaption(caption);
                    }}
                  ></textarea>
                  <button
                    className="create-new-post-btn"
                    onClick={async (e) => {
                      clearCaption();
                      e.preventDefault();

                      e.target.innerText = "POSTING..";
                      setTimeout(() => {
                        e.target.innerText = "POSTED!";
                        setcreateBoxOpen(false);
                      }, 4000);
                    }}
                  >
                    POST
                  </button>
                </div>
              ) : (
                ""
              )}
              <Link id="link" to={{ pathname: "/#header" }}>
                <i class="fas fa-home" title="Home" id="home-icon"></i>
              </Link>
              <Link
                className="link"
                to={{
                  pathname: "/reels",
                  state: {
                    uid: value ? value?.uid : "",
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <i class="fas fa-video" id="reels-icon" title="reels"></i>
              </Link>
              <i
                class="fas fa-bell"
                id="requests-icon"
                title="Notifications"
                onClick={() => {
                  if (reqOpen) setreqOpen(false);
                  else setreqOpen(true);
                }}
              ></i>
              <span className="notifications">{notificationCount}</span>

              <Link
                className="link"
                to={{
                  pathname: "/chats",
                  state: {
                    uid: value ? value?.uid : "",
                    username: userName,
                    pfpUrl: pfpUrl,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <i
                  class="fas fa-paper-plane"
                  id="paper-plane"
                  title="Messages"
                ></i>
              </Link>
              <span className="messages">{messagesCount}</span>
            </div>
          </div>

          {reqOpen ? (
            <div className="requests-container">
              {typeOfAccount == "private" ? (
                <>
                  <div className="requests-heading">Follow Requests</div>
                  <i
                    class="fas fa-window-close"
                    id="request-close-btn"
                    onClick={() => {
                      setreqOpen(false);
                    }}
                  ></i>

                  <div className="requests">
                    {allRequests.map((request, index) => {
                      return (
                        <div key={index} className="requests-inner">
                          <img className="request-pfp" src={request.pfp} />
                          <p className="request-username">
                            {request.name} wants to follow you
                          </p>

                          <button
                            className="request-allow-btn"
                            onClick={async () => {
                              
                              
                            }}
                          >
                            Allow
                          </button>
                          <i
                            class="far fa-times-circle"
                            id="request-close-btn"
                            onClick={async (e) => {
                              await firestore
                                .collection("users")
                                .doc(value?.uid)
                                .collection("requests")
                                .doc("request" + request?.ruid)
                                .delete();
                            }}
                          ></i>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="follows-container">
                    <div className="follows-container-follows-heading">
                      <h4>Activity</h4>
                      <i
                        class="fas fa-window-close"
                        id="request-container-close-btn"
                        onClick={() => {
                          setreqOpen(false);
                        }}
                      ></i>
                    </div>
                    <div className="follows-container-follows">
                      {allRequests.map((request, index) => {
                        return (
                          <div className="follows-container-inner-follows">
                            <img
                              src={request.pfp}
                              alt=""
                              className="follows-container-pfp"
                            />
                            <p className="follows-container-username">
                              {request.name}
                            </p>
                            <p className="follows-container-followingyou">
                              started following you
                            </p>
                            <i
                              class="far fa-times-circle"
                              id="follows-container-close"
                              onClick={async (e) => {
                                await firestore
                                  .collection("users")
                                  .doc(value?.uid)
                                  .collection("requests")
                                  .doc("request" + request?.ruid)
                                  .delete();
                              }}
                            ></i>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            ""
          )}
          <div class="stories-posts-sidebar-container">
            <div class="stories-posts-container">
              <div className="home-stories">
                <ul className="stories-container">
                  <li className="story-list-item">
                    <div className="story-img-container">
                      <img
                        src={pfpUrl}
                        className={
                          ownStories.length > 0 ? "own-stories-circle" : ""
                        }
                        onClick={() => {
                          if (ownStories.length > 0) {
                            history.push({
                              pathname: `/story/${value.uid}`,
                              state: {
                                uid: value?.uid,
                                uname: userName,
                                upfp: pfpUrl,
                              },
                            });
                          }
                        }}
                      />
                    </div>
                    <button
                      className="own-story"
                      onClick={() => {
                        history.push({
                          pathname: "/createstory",
                          state: {
                            uid: value?.uid,
                            uname: userName,
                            upfp: pfpUrl,
                          },
                        });
                      }}
                    >
                      +
                    </button>
                    <Link
                      id="link"
                      to={{
                        pathname: `/profile/${userName}`,
                        state: {
                          uid: value?.uid,
                        },
                      }}
                    >
                      <h6>{userName}</h6>
                    </Link>
                  </li>
                  {storiesArr.map((e) => {
                    return (
                      <li className="story-list-item">
                        <div className="story-img-container">
                          <img
                            className="others-stories"
                            src={e.storyBypfp}
                            onClick={() => {
                              history.push({
                                pathname: `/story/${e.storyByUn}`,
                                state: {
                                  uid: e.storyByUid,
                                  uname: e.storyByUn,
                                  upfp: e.storyBypfp,
                                },
                              });
                            }}
                          />
                        </div>
                        <Link
                          id="link"
                          to={{
                            pathname: `/profile/${e.storyByUn}`,
                            state: { uid: e?.storyByUid },
                          }}
                        >
                          <h6>{e.storyByUn}</h6>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {feedPosts.length > 0 ? (
                <div className="home-posts">
                  {feedPosts.map((post, index) => {
                    return (
                      <Postcard
                        key={index}
                        post={post}
                        uid={value?.uid}
                        username={userName}
                        pfpUrl={pfpUrl}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="no-posts-container">
                  <p className="no-post-title">No Posts here!</p>
                  <p className="no-post-matter">
                    Please follow people on Instagram-clone to see posts.
                  </p>
                </div>
              )}
            </div>
            <div
              className={
                suggestionsOpen ? "home-sidebar-responsive" : "home-sidebar"
              }
            >
              <i
                class="far fa-times-circle"
                id="suggestions-container-close"
                onClick={() => {
                  setSuggestionsOpen(false);
                }}
              ></i>
              {value ? (
                <>
                  <Suggestions
                    username={userName}
                    profilepic={pfpUrl}
                    uid={value?.uid}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
