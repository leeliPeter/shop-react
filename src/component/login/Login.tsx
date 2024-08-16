import React, { useRef, useEffect, useState } from "react";
import "./login.css";
import { set } from "lodash";

const Login: React.FC = () => {
  const [regClass, setRegClass] = useState("reg-button selected");
  const [loginClass, setLoginClass] = useState("login-button");
  const loginFormRef = useRef<HTMLDivElement>(null);
  const regFormRef = useRef<HTMLDivElement>(null);
  const regButtonRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        <div ref={regFormRef} className="reg-login-form reg-form">
          <form action="#" method="POST">
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
              <input type="checkbox" value="subscribe" name="subscribe" />
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
              Continue with Google
            </div>
          </form>
        </div>
        <div ref={loginFormRef} className="reg-login-form login-form">
          <form action="#" method="POST">
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
            <div className="forgot-pwd">Forgot your password?</div>
            <div className="or">
              <hr />
              Or
              <hr />
            </div>
            <div className="google-reg">
              <img src="./images/google_logo.webp" alt="Google Logo" />
              Log in with Google
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
