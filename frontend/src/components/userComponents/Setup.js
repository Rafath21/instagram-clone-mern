import {  useState } from "react";
import "../../css/setup.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {updateProfile} from "../../actions/authActions";
import axios from "axios";
import {logout} from "../../actions/authActions";

let Setup = () => {
  let dispatch=useDispatch();
  let history=useHistory();
  let [userName, setUserName] = useState("");
  let [bio, setBio] = useState("");
  let [img, setImg] = useState("");
  let [profilePreview, setProfilePreview] = useState("/defaultpfp.jpg");
  let [accountType, setAccountType] = useState("Private");
  let defUsername="";
  if(user?.username){
    defUsername=user?.username
  }
  const { error, loading, isAuthenticated ,user} = useSelector(
    (state) => state.user
  );
  const {isProfileUpdated}=useSelector((state)=>state.isProfileUpdated)
  async function handleDelete(){
    try{
      await axios({
        method:'Delete',
        url:`/api/v1/delete/${user?._id}`,
        withCredentials:true,
      }) 
      history.push("/");
      dispatch(logout());
    }catch(err){
      alert("Some error occured. Couldn't delete the account.")
    }
  }
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
      dispatch(updateProfile(user._id,userName,accountType,bio,img));
      setTimeout(()=>{
        history.push("/");
      },4000)
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
          placeholder="username for insta-clone.."  defaultValue={defUsername}
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
          }}  defaultValue={user?.typeOfAccount}
          id="account-type"
        >
          <option value="Private">Private</option>
          <option value="Public">Public</option>
        </select>
      </div>
      <div className="setup-bio-container">
        <p>Bio:</p>
        <textarea defaultValue={user?.bio}
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
            if (!user?.username && userName == "") {
              alert("Please enter a username");
              return;
            } else if (bio.length > 164) {
              alert("You are only allowed to have 164 characters in your bio.");
              return;
            } else {
              e.target.innerText="Please wait.."
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
          //deleting account
            handleDelete();
          }
        }}
      >
        Delete Account?
      </button>
    </div>
  );
};
export default Setup;