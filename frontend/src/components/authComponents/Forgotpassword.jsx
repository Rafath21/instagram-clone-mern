import { useState } from "react";
import axios from "axios";
import "../../css/forgotpassword.css";
import { useHistory } from "react-router-dom";
const ForgotPasswordScreen = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios({
        method: "POST",
        url: `/api/v1/auth/forgotpassword`,
        withCredentials: true,
        data: {
          email: email,
        },
      });
      alert(
        "An Email has been sent to you. Please reset your password with that link!"
      );
    } catch (error) {
      alert("Something went wrong! Please try again.");
      history.push("/login");
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotpassword-container">
      <h3 className="forgotpassword__title">Forgot Password</h3>
      {error && <span className="error-message">{error}</span>}
      {success && <span className="success-message">{success}</span>}
      <div className="inputs">
        <p className="forgotpassword__subtext">
          Please enter the email address you registered your account with. We
          will send you reset password confirmation to this email.
        </p>
        <label htmlFor="email">Email:</label>
        <input
          className="email-input"
          type="email"
          required
          id="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="send-email-btn"
        onClick={(e) => {
          forgotPasswordHandler(e);
        }}
      >
        Send Email
      </button>
    </div>
  );
};

export default ForgotPasswordScreen;
