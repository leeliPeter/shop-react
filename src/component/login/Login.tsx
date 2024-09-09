import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../Redux/userInfoSlice";
import { login } from "../../Redux/userInfoSlice";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [regClass, setRegClass] = useState("reg-button selected");
  const [loginClass, setLoginClass] = useState("login-button");
  const [reminderMessage, setReminderMessage] = useState("");
  const [reminderClass, setReminderClass] = useState("");
  const loginFormRef = useRef<HTMLDivElement>(null);
  const regFormRef = useRef<HTMLDivElement>(null);
  const regButtonRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLDivElement>(null);
  const regFormElementRef = useRef<HTMLFormElement>(null);
  const loginFormElementRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loginForm = loginFormRef.current;
    const regForm = regFormRef.current;
    const regButton = regButtonRef.current;
    const loginButton = loginButtonRef.current;

    if (loginForm && regForm && regButton && loginButton) {
      const handleRegButtonClick = () => {
        regForm.style.opacity = "1";
        loginForm.style.opacity = "0";
        loginForm.style.pointerEvents = "none";
        regForm.style.pointerEvents = "all";
        loginForm.style.transition = "0.6s";
      };

      const handleLoginButtonClick = () => {
        loginForm.style.opacity = "1";
        regForm.style.opacity = "0";
        regForm.style.pointerEvents = "none";
        loginForm.style.pointerEvents = "all";
        loginForm.style.transition = "0.6s";
      };

      regButton.addEventListener("click", handleRegButtonClick);
      loginButton.addEventListener("click", handleLoginButtonClick);

      return () => {
        regButton.removeEventListener("click", handleRegButtonClick);
        loginButton.removeEventListener("click", handleLoginButtonClick);
      };
    }
  }, []);

  const validatePassword = (password: string): string | null => {
    const minLength = 8;
    const maxLength = 16;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (password.length < minLength || password.length > maxLength) {
      return "Password must be between 8 and 16 characters long.";
    }
    if (!hasLetters || !hasNumbers) {
      return "Password must include both letters and numbers.";
    }
    return null;
  };

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const subscribe = formData.get("subscribe") === "on";

    // Validate password before proceeding
    const passwordError = validatePassword(password);
    if (passwordError) {
      setReminderMessage(passwordError);
      setReminderClass("error");
      return; // Stop further execution if password is invalid
    }

    try {
      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, subscribe }),
      });

      const result = await response.json();
      setReminderMessage(result.message);
      setReminderClass(
        result.message === "Registration successful!" ? "success" : "error"
      );
      if (result.message === "Registration successful!") {
        dispatch(updateUserInfo(result.userInfo)); // Save user info to Redux
        dispatch(login()); // Set login state to true in Redux
        navigate("/profile"); // Redirect to the profile page
      }
    } catch (error) {
      console.error("Error registering:", error);
      setReminderMessage("Registration failed. Please try again later.");
      setReminderClass("error");
    }
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials (cookies) in the request
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        setReminderMessage(result.message);
        setReminderClass(
          result.message === "Login successful!" ? "success" : "error"
        );

        if (result.message === "Login successful!") {
          dispatch(updateUserInfo(result.userInfo)); // Save user info to Redux
          dispatch(login()); // Set login state to true in Redux
          navigate("/profile"); // Redirect to the profile page
        }
      } else {
        const errorText = await response.json();
        setReminderMessage(
          errorText.message || "Login failed. Please try again later."
        );
        setReminderClass("error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setReminderMessage("Login failed. Please try again later.");
      setReminderClass("error");
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const res = await fetch("http://localhost:3001/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }),
        credentials: "include", // Include cookies in the request if needed
      });

      if (res.ok) {
        const result = await res.json();
        dispatch(updateUserInfo(result.userInfo)); // Save user info to Redux
        dispatch(login()); // Set login state to true in Redux
        navigate("/profile"); // Redirect to the profile page
      } else {
        const errorText = await res.json();
        console.error("Google login failed:", errorText.message);
        setReminderMessage(
          errorText.message || "Google login failed. Please try again later."
        );
        setReminderClass("error");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      setReminderMessage("Google login failed. Please try again later.");
      setReminderClass("error");
    }
  };

  // const handleGoogleLoginFailure = (error: any) => {
  //   console.error("Google login failed:", error);
  //   setReminderMessage("Google login failed. Please try again later.");
  //   setReminderClass("error");
  // };

  return (
    <div className="login-reg">
      <div className="container">
        <div className="login-reg-button">
          <div
            ref={regButtonRef}
            className={regClass}
            onClick={() => {
              setRegClass("reg-button selected");
              setLoginClass("login-button");
            }}
          >
            <div>Register</div>
          </div>
          <div
            ref={loginButtonRef}
            className={loginClass}
            onClick={() => {
              setLoginClass("login-button selected");
              setRegClass("login-button");
            }}
          >
            Log in
          </div>
        </div>
        <div className={`login-reg-reminder ${reminderClass}`}>
          <div>{reminderMessage}</div>
        </div>
        <div ref={regFormRef} className="reg-login-form reg-form">
          <form onSubmit={handleRegisterSubmit} ref={regFormElementRef}>
            <div className="form-title">Create account</div>
            <div>
              <input required type="email" name="email" placeholder="Email" />
            </div>
            <div>
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="subscribe">
              <input type="checkbox" name="subscribe" />
              <p>
                Subscribe to receive email updates about new product releases.
              </p>
            </div>
            <div>
              <input type="submit" value="Register" />
            </div>
            <div className="or">
              <hr />
              Or
              <hr />
            </div>
            <div className="google-reg">
              <img src="./images/google_logo.webp" alt="Google Logo" />
              <span>Continue with Google</span>
              <div className="google-login-btn">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.log("Google login error");
                    setReminderMessage(
                      "Google login failed. Please try again later."
                    );
                  }}
                ></GoogleLogin>
              </div>
            </div>
          </form>
        </div>
        <div ref={loginFormRef} className="reg-login-form login-form">
          <form onSubmit={handleLoginSubmit} ref={loginFormElementRef}>
            <div className="form-title">Log in</div>
            <div>
              <input required type="email" name="email" placeholder="Email" />
            </div>
            <div>
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div>
              <input type="submit" value="Login" />
            </div>

            <div className="forgot-pwd">
              {" "}
              <Link to="/forgot-pwd">Forgot your password? </Link>
            </div>

            <div className="or">
              <hr />
              Or
              <hr />
            </div>
            <div className="google-reg">
              <img src="./images/google_logo.webp" alt="Google Logo" />
              <span>Log in with Google</span>
              <div className="google-login-btn">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    console.log("Google login error");
                    setReminderMessage(
                      "Google login failed. Please try again later."
                    );
                  }}
                ></GoogleLogin>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
