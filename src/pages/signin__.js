import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";
import "./button.css";
import Card from "react-bootstrap/Card";
import { Row, Col, Container, Button } from "react-bootstrap";
import signin_pic from "./sigin.jpg";
// Component.js
import { config } from "../Constants";
var url = config.url.API_HOME;
const signup = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "Right",
        alignItems: "Right",
        height: "100vh",
      }}
    >
      <h1>Sign Up</h1>
    </div>
  );
};
const selfie =
  localStorage.getItem("picture") == null
    ? signin_pic
    : localStorage.getItem("picture").slice(1, -1);

export default function Form() {
  //google login button functions
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleSuccess = (response) => {
    console.log(response);
  };
  const handleFailure = (response) => {
    alert(response);
  };
  const handleLogin = async (googleData) => {
    const res = await fetch(url + "/api/google-login", {
      method: "POST",
      //credentials: 'always',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoginData(data);
    console.log(data);
    localStorage.setItem("loginData", JSON.stringify(data));
    localStorage.setItem("picture", JSON.stringify(data.picture));
    sessionStorage.setItem("token", googleData.tokenId);
    localStorage.setItem("loginID", JSON.stringify(data.id));
    window.location.reload(false);
  };
  const handleLogout = () => {
    axios.get(url + "/logout").then((response) => {
      //get logout for cookie
      // delete cookies front end :)
      //document.cookie=document.cookie+";max-age=0";
      //document.cookie=document.cookie+";max-age=0";
      console.log("clean cookie");
    });
    localStorage.removeItem("loginData"); //remove localstorage data user name.
    localStorage.removeItem("loginID");
    localStorage.removeItem("picture");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    sessionStorage.removeItem("token");
    setLoginData(null); //empty the localstorage data
    window.location.reload(false);
  };
  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>you are ready to go!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div>
      <br></br>
      {loginData == "" ? (
        <div>
          <Container
            style={{
              padding: "20px",
              display: "flex",
              width: "100%",
              "max-width": "60%",
              "justify-content": "center",
            }}
          >
            <Card
              style={{
                width: "18rem",
                "justify-content": "center",
                "align-content": "center",
                "flex-wrap": "wrap",
                "z-index": 0,
              }}
            >
              <Card.Body>
                <div
                  class="avatar-big"
                  style={{
                    width: "18rem",
                    "justify-content": "center",
                    "align-content": "center",
                    "flex-wrap": "wrap",
                    "z-index": 0,
                  }}
                >
                  <img
                    class="avatar-img rounded-circle"
                    referrerpolicy="no-referrer"
                    src={
                      localStorage.getItem("picture") == null
                        ? signin_pic
                        : localStorage.getItem("picture").slice(1, -1)
                    }
                  />
                </div>
                <Card.Title>{loginData.name}</Card.Title>
                <Card.Text>Email: {loginData.email}</Card.Text>
                <button class="button-85" role="button" onClick={handleLogout}>
                  Log out
                </button>
              </Card.Body>
            </Card>
          </Container>
        </div>
      ) : (
        <div>
          <div className="form">
            <div>
              <h1>User Login</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
              {errorMessage()}
              {successMessage()}
            </div>

            <form>
              {/* Labels and inputs for form data */}
              <label className="label">Email</label>
              <input
                onChange={handleEmail}
                className="input"
                value={email}
                type="email"
              />

              <label className="label">Password</label>
              <input
                onChange={handlePassword}
                className="input"
                value={password}
                type="password"
              />

              <button onClick={handleSubmit} className="btn" type="submit">
                Submit
              </button>
              <GoogleLogin
                clientId="172976540503-l9kdlci6rhsaulg741o8of7gfq8s4did.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    class="button-85"
                    role="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Google Login
                  </button>
                )}
                buttonText="Login"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
