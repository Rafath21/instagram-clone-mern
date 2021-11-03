import { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import {useLocation, useHistory, Link } from "react-router-dom";
import "../../css/stories.css";
import StoryLoader from "../../Loaders/StoryLoader";
let StoryComponent = () => {
  let location = useLocation();
  let history = useHistory();
  let [postedStories, setPostedStories] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(async () => {
    setPostedStories(location.state.story);
  }, []);

  function redirectToHome() {
    history.push("/");
  }
  function getStories() {
    let stories = postedStories.map((story) => {
      return {
        content: (props) => (
          <div className="story-container">
            <div className="story-header">
              <Link
                className="story-link"
                to={{
                  pathname: `/profile/${story.postedBy.username}`,
                  state: {
                    uid: story?.postedBy._id,
                  },
                }}
              >
                <img src={story.postedBy.pfp} />
                <p>{story.postedBy.username}</p>
              </Link>
            </div>
            <div className="story-image-container">
              <img className="story-image" src={story.storyurl} />
            </div>

            <span>{story.caption}</span>
          </div>
        ),
      };
    });
    return stories;
  }

  return (
    <>
      {loading ? (
        <StoryLoader />
      ) : (
        <div className="main-story-container">
          <Stories
            stories={getStories()}
            defaultInterval={5000}
            width={"100%"}
            height="100vh"
            onAllStoriesEnd={redirectToHome}
          />
        </div>
      )}
    </>
  );
};
export default StoryComponent;