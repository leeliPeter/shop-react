import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { url } from "../../ts/type";
import "./resetPwd.css";

export default function ResetPwd() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordLong, setPasswordLong] = useState(false);
  const [passwordLetter, setPasswordLetter] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [email, setEmail] = useState(""); // State to store the email from backend
  const [resetSucceed, setResetSucceed] = useState(false); // State to track if the reset was successful
  const passwordRef = useRef<HTMLInputElement>(null);

  const location = useLocation();

  // Extract token from URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    // Verify the token with the backend
    const verifyToken = async () => {
      try {
        const response = await fetch(`${url}/reset-password/verify-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setTokenValid(true);
          setEmail(data.email); // Save the email from the backend to the state
        } else {
          setTokenError(data.message || "Invalid or expired token.");
        }
      } catch (error) {
        setTokenError("Failed to verify token. Please try again later.");
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const validateNewPassword = (password: string) => {
    const isValidLength = password.length >= 8 && password.length <= 16;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!isValidLength) {
      return "Password must be between 8 and 16 characters.";
    }
    if (!hasLetter || !hasNumber) {
      return "Password must include both letters and numbers.";
    }
    return "";
  };

  const passwordCheck = (password: string) => {
    const minLength = 8;
    const maxLength = 16;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);

    setPasswordLong(
      password.length >= minLength && password.length <= maxLength
    );
    setPasswordLetter(hasLetters && hasNumbers);
  };

  useEffect(() => {
    passwordCheck(newPassword);
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPasswordValidation = validateNewPassword(newPassword);
    const confirmPasswordValidation =
      newPassword !== confirmPassword ? "Passwords do not match." : "";

    // setNewPasswordError(newPasswordValidation);
    setConfirmPasswordError(confirmPasswordValidation);

    if (!newPasswordValidation && !confirmPasswordValidation && tokenValid) {
      try {
        const response = await fetch(`${url}/reset-password/change-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email, // Email from the state
            newPassword, // New password entered by the user
            token, // Token extracted from the URL
          }),
        });

        if (response.ok) {
          setResetSucceed(true); // Set the resetSucceed state to true if successful
        } else {
          // handle error here
        }
      } catch (error) {
        // handle error here
      }
    }
  };

  return (
    <div className="reset">
      <div className="container">
        <div className="logo">
          <img src="./images/146855.png" alt="Shop Logo" />
          <div className="shopName">Peter's Shop</div>
        </div>
        <div className="title">Reset Password</div>
        {tokenError && <div className="error">{tokenError}</div>}
        {resetSucceed ? (
          <div className="resetSucceed">
            <div>Password reset successful!!</div>
            <div>
              <Link to="/login">
                <span className="iconfont icon-fanhui"></span>
                <span className="backToLogin">Back to Login</span>
              </Link>
            </div>
          </div>
        ) : (
          tokenValid && (
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <label htmlFor="new-password">New Password</label>
                <br />
                <input
                  type="password"
                  name="new-password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    passwordCheck(e.target.value); // Validate password on change
                  }}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  ref={passwordRef}
                  required
                />
                <div
                  className="password-check"
                  style={{ height: passwordFocus ? "70px" : "0px" }}
                >
                  <ol>
                    <li
                      style={{
                        color: passwordLong
                          ? "rgb(30, 123, 62)"
                          : "rgb(140, 33, 33)",
                      }}
                    >
                      Must be between 8 and 16 characters
                    </li>
                    <li
                      style={{
                        color: passwordLetter
                          ? "rgb(30, 123, 62)"
                          : "rgb(140, 33, 33)",
                      }}
                    >
                      Include both letters and numbers
                    </li>
                  </ol>
                </div>
              </div>
              <div className="inputBox">
                <label htmlFor="confirm-password">Confirm Password</label>{" "}
                <br />
                <div className="confirm-password-container">
                  <input
                    type="password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {confirmPasswordError && (
                    <div className="second-reset-reminder">
                      {confirmPasswordError}
                    </div>
                  )}
                </div>
              </div>
              <input
                className="submit-btn"
                type="submit"
                value="Reset Password"
              />
            </form>
          )
        )}
      </div>
    </div>
  );
}
