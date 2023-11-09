import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Home from ".";
import Recipe from "./recipe";
import Ingredients from "./ingredients";
import Signup from "./Signup";
import Signin from "./signin";
import Pantry from "./pantry";
import Pantry2 from "./pantry2";
import Friend from "./friend";
import "./NavbarElements.css";

<<<<<<< HEAD
export default class NavbarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: "Home",
    };
  }

  isLoggedIn() {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    return loginData !== null;
  }

  handleLogout = () => {
    localStorage.removeItem("loginData");
    // Perform any other necessary actions after logout
    // For example, redirect to the login page
    window.location.href = '/signin'; // Redirect to the signin page
  };

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Navbar collapseOnSelect className="backgroundhead">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
=======
export default function NavbarComp() {
  const [tag, setTag] = useState("Home");

  const isLoggedIn = () => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    return !!loginData;
  };

  const loginData = localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData"))
    : null;

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Navbar collapseOnSelect className="backgroundhead">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  eventKey="home"
                  as={Link}
                  to="/"
                  onClick={() => setTag("Home")}
                  className="tabs"
                >
                  About
                </Nav.Link>
                {isLoggedIn() && (
>>>>>>> 0f539c3 (changes to profile logo and responsiveness for signin page)
                  <Nav.Link
                    eventKey="Ingredients"
                    as={Link}
                    to="/Ingredients"
                    onClick={() => setTag("Ingredients")}
                    className="tabs"
                  >
<<<<<<< HEAD
                    About
                  </Nav.Link>
                  {this.isLoggedIn() && (
                    <>
                      <Nav.Link
                        eventKey="Ingredients"
                        as={Link}
                        to="/Ingredients"
                        onClick={() => this.setState({ tag: "Ingredients" })}
                        className="tabs"
                      >
                        Ingredients
                      </Nav.Link>
                      <Nav.Link
                        eventKey="pantry"
                        as={Link}
                        to="/pantry"
                        onClick={() => this.setState({ tag: "pantry" })}
                        className="tabs"
                      >
                        Pantries
                      </Nav.Link>
                      <Nav.Link
                        eventKey="signin"
                        as={Link}
                        to="/signin"
                        onClick={() => this.setState({ tag: "Profile" })}
                        className="tab-profile"
                      >
                        Profile
                      </Nav.Link>
                      <Nav.Link
                        eventKey="signin"
                        as={Link}
                        to="/reciperec"
                        onClick={() => this.setState({ tag: "Profile" })}
                        className="tab-profile"
                      >
                        Recipe Recommender
                      </Nav.Link>
                    </>
                  )}
                  {!this.isLoggedIn() && (
                    <>
                      <Nav.Link
                        eventKey="signin"
                        as={Link}
                        to="/signin"
                        onClick={() => this.setState({ tag: "Login" })}
                        className="tab-profile"
                      >
                        Login
                      </Nav.Link>
                      <Nav.Link
                        eventKey="register"
                        as={Link}
                        to="/signup"
                        onClick={() => this.setState({ tag: "Register" })}
                        className="tab-profile"
                      >
                        Register
                      </Nav.Link>
                    </>
                  )}
                </Nav>
                <Nav>
                  {this.isLoggedIn() && (
                    <Nav.Link
                      onClick={this.handleLogout}
                      className="tab-profile ml-auto"
                    >
                      Logout
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/pantry">
              <Pantry />
            </Route>
            <Route path="/pantry2">
              <Pantry2 />
            </Route>
            <Route path="/friend">
              <Friend />
            </Route>
            <Route path="/Ingredients">
              <Ingredients />
            </Route>
            <Route path="/Recipe">
              <Recipe />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
=======
                    Ingredients
                  </Nav.Link>
                )}
                {isLoggedIn() && (
                  <Nav.Link
                    eventKey="pantry"
                    as={Link}
                    to="/pantry"
                    onClick={() => setTag("pantry")}
                    className="tabs"
                  >
                    Pantries
                  </Nav.Link>
                )}
                {isLoggedIn() && (
                  <Nav.Link
                    eventKey="signin"
                    as={Link}
                    to="/signin"
                    onClick={() => setTag("Profile")}
                    className="tab-profile"
                  >
                    <img
                      class="profile-pic-navbar"
                      referrerpolicy="no-referrer"
                      src={
                        localStorage.neufoodAccount == "true"
                          ? signin_pic
                          : localStorage.getItem("picture").slice(1, -1)
                      }
                    />
                  </Nav.Link>
                )}
                {!isLoggedIn() && (
                  <Nav.Link
                    eventKey="signin"
                    as={Link}
                    to="/signin"
                    onClick={() => setTag("Login")}
                    className="tab-profile"
                  >
                    Login
                  </Nav.Link>
                )}
                {!isLoggedIn() && (
                  <Nav.Link
                    eventKey="register"
                    as={Link}
                    to="/signup"
                    onClick={() => setTag("Register")}
                    className="tab-profile"
                  >
                    Register
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/pantry">
            <Pantry />
          </Route>
          <Route path="/pantry2">
            <Pantry2 />
          </Route>
          <Route path="/friend">
            <Friend />
          </Route>
          <Route path="/Ingredients">
            <Ingredients />
          </Route>
          <Route path="/Recipe">
            <Recipe />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
>>>>>>> 0f539c3 (changes to profile logo and responsiveness for signin page)
}
