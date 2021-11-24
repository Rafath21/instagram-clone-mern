import "../../css/App.css";
import "../../css/Responsive.css";
import { Redirect, Link ,useHistory} from "react-router-dom";
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearErrors } from "../../actions/authActions";
let Login = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  let [currUserEmail, setCurrUserEmail] = useState("");
  let [currUserPswd, setCurrUserPswd] = useState("");
  const { error, isAuthenticated, user } = useSelector((state) => state.user);
 useEffect(() => {
    if (error) {
      alert("Invalid Credentials!");
      dispatch(clearErrors());
    }if (isAuthenticated!=false) {
      history.push("/");
    }
  }, [dispatch, error, history, isAuthenticated]);
  async function handleLogin() {
    dispatch(login(currUserEmail, currUserPswd));
  }
  return (
    <div>
      <div className="login-form-container">
        <div className="form-container">
          <h1>Welcome Back!</h1>
          <h3>Please Login</h3>
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
          <hr />

          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin()
            }}
            type="submit"
            class="loginbtn"
          >
            Login
          </button>
        </div>
        <p>
          Don't have an account?
          <Link id="link-login" to="register">
            Register
          </Link>
        </p>
      </div>
      ;
    </div>
  );
};
export default Login;