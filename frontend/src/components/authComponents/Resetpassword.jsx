import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "../../css/resetpassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  let history = useHistory();
  let { resetToken } = useParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      let { data } = await axios({
        method: "PUT",
        url: `/api/v1/auth/passwordreset/${resetToken}`,
        withCredentials: true,
        data: {
          password: password,
        }
      });
      history.push("/login");
    } catch (error) {
      alert("Something went wrong! Please try again.");
      history.push("/login")
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="reset-password-container">
      <h3 className="resetpassword__title">Reset Password</h3>
      {error && <span className="error-message">{error} </span>}
      {success && (
        <span className="success-message">
          {success} <Link to="/login">Login</Link>
        </span>
      )}
      <div className="form-group">
        <label htmlFor="password">New Password:</label>
        <input
          class="password-input"
          type="password"
          required
          id="password"
          placeholder="Enter new password"
          autoComplete="true"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmpassword">Confirm New Password:</label>
        <input
          class="confirm-password-input"
          type="password"
          required
          id="confirmpassword"
          placeholder="Confirm new password"
          autoComplete="true"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="reset-password-btn"
        onClick={(e) => {
          resetPasswordHandler(e);
        }}
      >
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
