import "../../css/App.css";
import "../../css/Responsive.css";
import { Redirect, Link ,useHistory} from "react-router-dom";
import { useState,useEffect } from "react";
import { register} from "../../actions/authActions";
import { useSelector, useDispatch } from "react-redux";
let Register = () => {
  let [currUserEmail, setCurrUserEmail] = useState("");
  let [currUserPswd, setCurrUserPswd] = useState("");
  let [confirmPassword,setconfirmPassword]=useState("");
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  let history = useHistory();
  let dispatch = useDispatch();
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
async function handleRegister(e) {
    if (currUserPswd != confirmPassword) {
      alert("passwords don't match");
    } else {
      dispatch(register( currUserEmail,currUserPswd));
    }
  }
  useEffect(() => {
    console.log(error)
    if (error) {
      alert(error);
    }

    if (isAuthenticated) {
      history.push("/setup");
    }
  }, [dispatch, error, history, isAuthenticated]);
  return (
    <div>
      <div className="register-form-container">
        <div className="form-container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label for="email">
            <b>Email</b>
          </label>
          <input
            onChange={(e) => {
              setCurrUserEmail(e.currentTarget.value);
            }}
            class="email-input"
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            required
          />

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            onChange={(e) => {
              setCurrUserPswd(e.currentTarget.value);
            }}
            class="password-input"
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            required
          />
          <label for="psw">
            <b>Confirm Password</b>
          </label>
          <input
            onChange={(e) => {
              setconfirmPassword(e.currentTarget.value);
            }}
            class="password-input"
            type="password"
            placeholder="Enter Password again"
            name="psw"
            id="psw"
            required
          />
          <hr />

          <button
            onClick={(e) => {
              e.preventDefault();

              if (!currUserEmail.match(validRegex)) {
                alert("Invalid email address!");
                return;
              }
              if (currUserPswd.length < 6) {
                alert("Password must contain at least 6 characters.🤔");
                return;
              }
              handleRegister();
            }}
            type="submit"
            className="registerbtn"
          >
            Register
          </button>
          <div className="container-signin">
            <p>
              Already have an account?
              <Link id="link-login" to="/login">
                Sign in
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;