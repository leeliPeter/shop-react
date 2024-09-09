import "./forgotPwd.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ForgotPwd() {
  const [email, setEmail] = useState("");
  const [reminderMessage, setReminderMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false); // Track if email was sent

  const handleResetPassword = async (email: string) => {
    try {
      const response = await fetch("http://localhost:3001/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);

      setReminderMessage(result.message);
      setEmailSent(true); // Set emailSent to true if successful
    } catch (error) {
      console.error("Error:", error);
      setReminderMessage("Sorry, we didn't find your email address.");
    }
  };

  return (
    <div className="forgotPwd">
      <div className="container">
        <div className="title">Reset Password</div>

        {emailSent ? ( // Conditionally render content based on emailSent
          <div className="forgot-pwd-content">
            <p>Link sent</p>
            <p>
              Nice one. Now just check your inbox, you should receive an email
              shortly with a link to reset your password.
            </p>
            <div className="back">
              <Link to="/">
                <span className="iconfont icon-fanhui"></span>
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="forgot-pwd-content">
            <p>Forgot your password?</p>
            <p>Please enter your email to reset your password.</p>

            {reminderMessage && (
              <div className="forgot-reminder">{reminderMessage}</div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleResetPassword(email);
              }}
            >
              <div>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="forgotPwd-btn">
                <div>
                  <Link to="/login">Back to Login</Link>
                </div>
                <button type="submit">
                  <div>Reset Password</div>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
