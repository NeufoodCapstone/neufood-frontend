import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
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
import FAQ from "./faq";
import Guide from "./userGuide";
import "./NavbarElements.css";

export default class NavbarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: "Home",
      showDropdown: false, // Added state to manage dropdown visibility
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
    window.location.href = "/signin"; // Redirect to the signin page
  };

  handleToggleDropdown = () => {
    this.setState((prevState) => ({ showDropdown: !prevState.showDropdown }));
  };

  render() {
    const { showDropdown } = this.state;

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Navbar collapseOnSelect className="backgroundhead">
            <Container>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                  {" "}
                  {/* Use ml-auto to push the items to the right */}
                  <Nav.Link
                    eventKey="hamburger-menu"
                    onClick={this.handleToggleDropdown}
                    className="mr-2"
                  >
                    ☰
                  </Nav.Link>
                  <NavDropdown
                    title=""
                    id="basic-nav-dropdown"
                    align="end"
                    show={showDropdown}
                    onClick={this.handleToggleDropdown}
                    drop="end"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/"
                      onClick={() => this.setState({ tag: "Home" })}
                    >
                      Home
                    </NavDropdown.Item>
                    {this.isLoggedIn() && (
                      <>
                        <NavDropdown.Item
                          as={Link}
                          to="/signin"
                          onClick={() => this.setState({ tag: "Profile" })}
                        >
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/pantry"
                          onClick={() => this.setState({ tag: "pantry" })}
                        >
                          Pantries
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/Ingredients"
                          onClick={() => this.setState({ tag: "Ingredients" })}
                        >
                          Ingredients
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item as={Link} to="/reciperec" onClick={() => this.setState({ tag: "Profile" })}>
                          Recipe Recommender
                        </NavDropdown.Item> */}
                        <NavDropdown.Item
                          as={Link}
                          to="/faq"
                          onClick={() => this.setState({ tag: "FAQ" })}
                        >
                          FAQ
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/userGuide"
                          onClick={() => this.setState({ tag: "Guide" })}
                        >
                          User Guide
                        </NavDropdown.Item>
                      </>
                    )}
                    {!this.isLoggedIn() && (
                      <>
                        <NavDropdown.Item
                          as={Link}
                          to="/signup"
                          onClick={() => this.setState({ tag: "Register" })}
                        >
                          Sign Up
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/signin"
                          onClick={() => this.setState({ tag: "Login" })}
                        >
                          Login
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/faq"
                          onClick={() => this.setState({ tag: "FAQ" })}
                        >
                          FAQ
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/userGuide"
                          onClick={() => this.setState({ tag: "Guide" })}
                        >
                          User Guide
                        </NavDropdown.Item>
                      </>
                    )}
                    {this.isLoggedIn() && (
                      <NavDropdown.Item onClick={this.handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
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
            <Route path="/FAQ">
              <FAQ />
            </Route>
            <Route path="/userGuide">
              <Guide />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
