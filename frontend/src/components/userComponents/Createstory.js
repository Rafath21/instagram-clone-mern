import "../../css/stories.css";
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStory } from "../../actions/storyActions";
let Createstory = () => {
  let [uploadFile, setuploadFile] = useState("");
  let dispatch=useDispatch();
  let [uploadCaption, setuploadCaption] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { isStoryCreated } = useSelector((state) => state.isStoryCreated);
  let location = useLocation();
  let history = useHistory();
  const updateStoryImg = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setuploadFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="create-story-container">
      <h3>Create new Story</h3>
      <div className="choose-story-file">
        <p>Choose photo..</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (!e.target.files[0]) return;
            updateStoryImg(e);
          }}
        />
      </div>
      <div className="story-write-caption">
        <p>Write caption:</p>
        <textarea
          onChange={(e) => {
            let caption = e.currentTarget.value;
            setuploadCaption(caption);
          }}
        ></textarea>
      </div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          e.target.innerText = "POSTED";
          dispatch(createStory(user?._id, uploadFile, uploadCaption));
            history.push("/");
        }}
      >
        POST
      </button>
    </div>
  );
};
export default Createstory;
