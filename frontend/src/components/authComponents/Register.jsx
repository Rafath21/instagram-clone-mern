import "../../css/auth.css";
import {  Link, useHistory } from "react-router-dom";
import {  useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register, clearErrors } from "../../actions/authActions";
let Register = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setconfirmPassword] = useState("");
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );


  async function handleRegister(e) {
    if (password != confirmPassword) {
      alert("passwords don't match");
    } else {
      dispatch(register(username, email, password));
    }
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push("/");
    }
  }, [dispatch, error, history, isAuthenticated]);
  return (
    <div>
      <div className="register-form-container">
        <div className="form-container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          {error && <span className="error-message">{error}</span>}

          <label for="username">
            <b>Username</b>
          </label>
          <input
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
            class="name-input"
            type="text"
            placeholder="Enter Username"
            name="username"
            required
          />
          <label for="email">
            <b>Email</b>
          </label>
          <input
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            class="email-input"
            type="email"
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
              setPassword(e.currentTarget.value);
            }}
            class="password-input"
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            required
          />
          <label for="confirm-psw">
            <b>Confirm password</b>
          </label>
          <input
            onChange={(e) => {
              setconfirmPassword(e.currentTarget.value);
            }}
            class="password-input"
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            required
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              handleRegister(e);
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
