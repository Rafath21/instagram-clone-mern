import { useEffect, useState } from "react";
import Stories from "react-insta-stories";
import {useLocation, useHistory, Link } from "react-router-dom";
import "../../css/stories.css";
import StoryLoader from "../../Loaders/StoryLoader";
let StoryComponent = () => {
  let location = useLocation();
  let history = useHistory();
  let [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    if(location.state.stories){
      setLoading(false);
    }
  }, []);
  function redirectToHome() {
    history.push("/");
  }
  function getStories() {
    let stories = location.state.stories?.map((story) => {
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
            defaultInterval={4000}
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