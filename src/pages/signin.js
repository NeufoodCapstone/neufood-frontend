import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import GoogleLogin from "react-google-login";
import Pill from "../components/Pill";
import { config } from "../Constants";
import "./about.css";
import "./button.css";
import logo from "./logo-no-text.png";
import signin_pic from "./sigin.png";
import "./signin.css";

var url = config.url.API_HOME;

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentError, setCurrentError] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showFriendPopup, setShowFriendPopup] = useState(false);

  const allergies = [
    "Peanuts",
    "Tree Nuts",
    "Milk",
    "Eggs",
    "Wheat",
    "Soy",
    "Fish",
    "Shellfish",
    "Gluten",
    "Sesame",
    "Lactose",
    "Pollen",
    "Grass Pollen",
    "Tree Pollen",
    "Weed Pollen",
    "Dust Mites",
    "Animal Dander",
    "Cockroach",
    "Latex",
    "Mold",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  //google login button functions
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const handleLogout = () => {
    axios.get(url + "/logout").then((response) => {});
    localStorage.removeItem("loginData"); //remove localstorage data user name.
    localStorage.removeItem("loginID");
    localStorage.removeItem("picture");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    sessionStorage.removeItem("token");
    localStorage.removeItem("neufoodAccount");
    setLoginData(null); //empty the localstorage data
    window.location.reload(false);
  };

  const handleLogin = async (e) => {
    setErrorEmail(false);
    setErrorPassword(false);
    if (!email || !password) {
      setErrorEmail(true);
      setErrorPassword(true);
      setCurrentError("Please fill out all required fields");
    }
    let response = await fetch(url + "/authentication/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    if (result.error) {
      switch (result.error) {
        case "user does not exist":
          setErrorEmail(true);
          setCurrentError(
            "This email is not associated with a neufood account"
          );
          break;
        case "wrong password":
          setErrorPassword(true);
          setCurrentError("Incorrect password");
          break;
        default:
          setCurrentError("Internal server error, please try again later");
          break;
      }
    } else {
      localStorage.setItem("loginData", JSON.stringify(result));
      sessionStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("loginID", JSON.stringify(result.id));
      localStorage.setItem("neufoodAccount", true);
      setLoginData(result);
      window.location.reload(false);
    }
  };

  const handleGoogleLogin = async (googleData) => {
    const res = await fetch(url + "/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    localStorage.setItem("loginData", JSON.stringify(data));
    localStorage.setItem("picture", JSON.stringify(data.picture));
    sessionStorage.setItem("token", googleData.tokenId);
    localStorage.setItem("loginID", JSON.stringify(data.id));
    localStorage.setItem("neufoodAccount", false);
    setLoginData(data);
    window.location.reload(false);
  };
  const handleFailure = (response) => {
    alert(response);
  };

  const [allergens, setAllergens] = useState([]);
  const [friends, setFriends] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [addFriendValue, setAddFriendValue] = useState("");
  const [addFriendSuccess, setAddFriendSuccess] = useState(0);

  useEffect(async () => {
    try {
      const response = await axios.get(`${url}/user/allergy/${loginData.id}`);
      setAllergens(response.data.allergens);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(async () => {
    try {
      const response = await axios.get(`${url}/user/friends/${loginData.id}`);
      setFriends(response.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(async () => {
    try {
      const response = await axios.get(
        `${url}/notifications/${loginData.email}`
      );
      setNotifications(response.data.notifications);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSelectChange = (e) => {
    try {
      axios.post(`${url}/user/allergy/${loginData.id}`, {
        uid: loginData.id,
        allergen: e.target.value,
      });
      setAllergens([...allergens, e.target.value]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddFriend = () => {
    setShowFriendPopup(false);
    try {
      axios.post(`${url}/notifications/add`, {
        type: "friend-request",
        senderEmail: loginData.email,
        receiverEmail: addFriendValue,
      });
    } catch (err) {
      console.error(err);
      setAddFriendSuccess(-1);
      return;
    }
    setAddFriendSuccess(1);
  };

  const handleDeclineFriendRequest = async (id) => {
    try {
      await axios.put(`${url}/notifications/read`, { notificationId: id });
    } catch (err) {
      return console.error(err);
    }
    const newNotifications = notifications.filter(
      (notification) => notification._id !== id
    );
    setNotifications(newNotifications);
  };

  const handleAcceptFriendRequest = async (id, email) => {
    try {
      await axios.post(
        `${url}/user/${loginData.id}/${email}/${loginData.email}`
      );
      await axios.put(`${url}/notifications/read`, { notificationId: id });
    } catch (err) {
      return console.error(err);
    }
    const newNotifications = notifications.filter(
      (notification) => notification._id !== id
    );
    setNotifications(newNotifications);
    setFriends([...friends, email]);
  };

  const [selectedOption, _] = useState("");

  return (
    <div className="bckgrnd" data-testid="signin-1">
      <Container>
        <img className="logo-img" src={logo} />
        {loginData != null && (
          <figcaption className="pageTitle">Profile</figcaption>
        )}
      </Container>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="100%">
          {loginData ? (
            <div className="pad">
              <Container className="contain">
                <Card className="card">
                  <Card.Body>
                    <div className="card-body-div">
                      <div class="avatar-big">
                        <img
                          class="avatar-img rounded-circle"
                          referrerpolicy="no-referrer"
                          src={
                            localStorage.neufoodAccount == "true"
                              ? signin_pic
                              : localStorage.getItem("picture").slice(1, -1)
                          }
                        />
                      </div>
                      <figcaption className="figcaption">
                        <div>
                          <Card.Title>{loginData.name}</Card.Title>
                          <Card.Text className="card-text">
                            Email: {loginData.email}
                          </Card.Text>
                          {loginData.provider === "google.com" && (
                            <img
                              className="google-img"
                              src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-google-circle-512.png"
                              alt="Google icon"
                            />
                          )}
                        </div>
                      </figcaption>
                    </div>
                  </Card.Body>
                </Card>
              </Container>
<<<<<<< HEAD
              <Container style={{ width: "60%", marginTop: "50px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                    backgroundColor: "#F1F1F1",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "20px",
                  }}
                >
                  {/* <div
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "20px",
                      border: "3px solid #8B0000",
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                      padding: "20px",
                      textAlign: "left",
                      fontWeight: "bold",
                      fontFamily: "Urbanist",
                    }}
                  >
                    <p>Recipe Recommendation</p>
                  </div> */}
                  {/* <div
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "20px",
                      border: "3px solid #8B0000",
                      display: "block",
                      justifyContent: "left",
                      alignItems: "center",
                      padding: "20px",
                      textAlign: "left",
                      fontWeight: "bold",
                      fontFamily: "Urbanist",
                    }}
                  >
=======
              <Container className="contain-1">
                <div className="card-body-div-1">
                  <div className="card-body-div-2">
                    <p>Recipe Recommendation</p>
                  </div>
                  <div className="card-body-div-2">
>>>>>>> 0f539c3 (changes to profile logo and responsiveness for signin page)
                    <p>Allergies/Diet</p>
                    <div className="card-body-div-3">
                      {allergens.map((allergy) => (
                        <Pill title={allergy} />
                      ))}
                    </div>
                    <button
                      onClick={() => setShowPopup(!showPopup)}
                      className="button"
                    >
                      +
                    </button>
                    {showPopup && (
                      <select
                        id="dropdown"
                        value={selectedOption}
                        onChange={handleSelectChange}
                      >
                        <option value="">Select an allergy</option>
                        <option key={-1} value={"Water"}>
                          Water
                        </option>
                        {allergies.map((allergy, index) =>
                          !allergens.includes(allergy) ? (
                            <option key={index} value={allergy}>
                              {allergy}
                            </option>
                          ) : null
                        )}
                      </select>
                    )}
                  </div> */}

                  <div className="card-body-div-2">
                    <p>Badges</p>
                  </div>
<<<<<<< HEAD
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "20px",
                      border: "3px solid #8B0000",
                      display: "block",
                      justifyContent: "left",
                      alignItems: "center",
                      padding: "20px",
                      textAlign: "left",
                      fontWeight: "bold",
                      fontFamily: "Urbanist",
                    }}
                  >
=======
                  <div className="card-body-div-2">
>>>>>>> 0f539c3 (changes to profile logo and responsiveness for signin page)
                    <p>Friends</p>
                    {addFriendSuccess === 1 && (
                      <p style={{ color: "green" }}>Friend Request Sent</p>
                    )}
                    {addFriendSuccess === -1 && (
                      <p style={{ color: "red" }}>
                        Friend Request Failed to Send. Please Try Again Later.
                      </p>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {friends.map((friend) => (
                        <Pill title={friend.email} />
                      ))}
                    </div>
                    <button
                      onClick={() => setShowFriendPopup(!showFriendPopup)}
                      className="button"
                    >
                      +
                    </button>
                    {showFriendPopup && (
                      <>
                        <input
                          type="text"
                          placeholder="Enter Email"
                          value={addFriendValue}
                          onChange={(e) => setAddFriendValue(e.target.value)}
                        />
                        <button onClick={handleAddFriend} className="button">
                          Send Request
                        </button>
                      </>
                    )}
                  </div>
<<<<<<< HEAD
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "20px",
                      border: "3px solid #8B0000",
                      display: "block",
                      justifyContent: "left",
                      alignItems: "center",
                      padding: "20px",
                      textAlign: "left",
                      fontWeight: "bold",
                      fontFamily: "Urbanist",
                    }}
                  >
=======
                  <div className="card-body-div-2">
>>>>>>> 0f539c3 (changes to profile logo and responsiveness for signin page)
                    <p>Notifications</p>
                    {notifications &&
                      notifications.map((notification) => {
                        if (notification.isRead) return;
                        switch (notification.type) {
                          default:
                            return (
                              <Pill
                                title={
                                  <>
                                    <div>
                                      Friend Request From {notification.sender}
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                      }}
                                    >
                                      <button
                                        className="button"
                                        onClick={() =>
                                          handleAcceptFriendRequest(
                                            notification._id,
                                            notification.sender
                                          )
                                        }
                                      >
                                        Accept
                                      </button>
                                      <button
                                        className="button"
                                        onClick={() =>
                                          handleDeclineFriendRequest(
                                            notification._id
                                          )
                                        }
                                      >
                                        Decline
                                      </button>
                                    </div>
                                  </>
                                }
                              />
                            );
                        }
                      })}
                  </div>
                </div>
              </Container>
              <button
                class="button signin"
                role="button"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <div>
              <CssBaseline />

              <Box
                sx={{
                  backgroundColor: "rgb(245, 239, 237)",
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: "10%",
                  paddingTop: "8%",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className="typo">
                  Sign in
                </Typography>
                {currentError && (
                  <Typography component="p" variant="p" color="error">
                    {currentError}
                  </Typography>
                )}
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{
                    mt: 1,
                    borderRadius: "20px",
                    border: "2px solid green",
                    padding: "30px",
                  }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email-sign-in"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={
                      (errorEmail && {
                        input: { color: "red" },
                      },
                      {
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          borderColor: "brown",
                          borderWidth: "10px",
                        },
                      })
                    }
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    data-testid="password-input"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        borderColor: "brown",
                        borderWidth: "10px",
                      },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                    id="login-button"
                  >
                    Sign In
                  </Button>
                  <div className="form">
                    {/* Calling to the methods */}
                    <form id="signin-form">
                      {/* Labels and inputs for form data */}
                      <GoogleLogin
                        clientId="172976540503-l9kdlci6rhsaulg741o8of7gfq8s4did.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            role="button"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            id="google-login-button"
                          >
                            Google Sign in
                          </Button>
                        )}
                        buttonText="Login"
                        onSuccess={handleGoogleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={"single_host_origin"}
                      />
                    </form>
                  </div>
                  <Grid container>
                    <Grid item>
                      <Link
                        href="/signup"
                        variant="body2"
                        sx={{
                          fontFamily: "Urbanist",
                          textAlign: "center",
                          display: "block",
                          mt: 2,
                        }}
                      >
                        {"Don't have an account? Sign up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </div>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
}
