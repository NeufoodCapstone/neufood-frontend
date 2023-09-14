import React, { Component } from "react";
import NavBarComp from "./pages/NavbarComp";
import Footer from "./pages/Footer";
import logo from "./namelogo.png";
import { env } from "./env";
import "./App.css";

class App extends Component {
  render() {
    console.log("Host URL:" + env.REACT_APP_PUBLIC_URL);
    return (
      <div className="App">
        <NavBarComp></NavBarComp>
        <Footer />
      </div>
    );
  }
}

export default App;
