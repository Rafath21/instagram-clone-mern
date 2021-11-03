import {  useState, useEffect } from "react";
import "../../css/setup.css";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {updateProfile} from "../../actions/authActions";
let Setup = () => {
  let disptach=useDispatch();
  let history=useHistory();
  let [userName, setUserName] = useState("");
  let [bio, setBio] = useState("");
  let [img, setImg] = useState("");
  let [profilePreview, setProfilePreview] = useState("/defaultpfp.jpg");
  let [accountType, setAccountType] = useState("Private");
  const { error, loading, isAuthenticated ,user} = useSelector(
    (state) => state.user
  );
  const {isProfileUpdated}=useSelector((state)=>state.isProfileUpdated)
  function handleTypechange(e) {
    setAccountType(e.currentTarget.value);
  }
  const updateProfileImg = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePreview(reader.result);
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const setProfile=()=>{
      disptach(updateProfile(user._id,userName,accountType,bio,img));
      if(isProfileUpdated){
        history.push("/");
      }
  }
  return (
    <div className="setup-container">
      <div className="setup-profile-pic-container">
        <img src={profilePreview} alt="profile-pic" />
        <input
          type="file"
          accept="image/*"
          onClick={(e) => {
            e.target.value = null;
          }}
          onChange={(e) => {
            e.preventDefault();
            updateProfileImg(e);
          }}
        />
      </div>
      <div className="setup-username-container">
        <p>Username:</p>
        <input
          type="text"
          placeholder="username for insta-clone.."
          onChange={(e) => {
            setUserName(e.currentTarget.value);
          }}
        />
      </div>
      <div className="setup-account-type-container">
        <p>I want my account to be:</p>
        <select
          onChange={(e) => {
            handleTypechange(e);
          }}
          id="account-type"
        >
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
      </div>
      <div className="setup-bio-container">
        <p>Bio:</p>
        <textarea
          placeholder="what describes you best?"
          onChange={(e) => {
            setBio(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="setup-submit-btn">
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            e.currentTarget.value = "setting up..";
            if (userName == "") {
              alert("Please enter a username");
              return;
            } else if (bio.length > 164) {
              alert("You are only allowed to have 164 characters in your bio.");
              return;
            } else {
              setProfile();
            }
          }}
        >
          Submit
        </button>
      </div>

      <button
        className="acc-delete-btn"
        onClick={async () => {
          let res = false,
            confirmation;
          confirmation = window.confirm(
            "Sad to see you go 😕. Are you sure you want to delete?"
          );
          if (confirmation) {
          //code for deleting account
          }
        }}
      >
        Delete Account?
      </button>
    </div>
  );
};
export default Setup;