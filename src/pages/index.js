import React from "react";

import logo from "./logo-transparent.png";

import Container from "react-bootstrap/Container";
import BouncingArrow from "../components/BouncingArrow";
import "./about.css";
import account from "../imgs/about/account.png";
import network from "../imgs/about/network.png";
import recipe from "../imgs/about/recipe.png";
import time from "../imgs/about/time.png";

import { Link, animateScroll as scroll } from 'react-scroll';



const Home = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "Right",
        backgroundColor: "rgb(245, 239, 237)",
      }}
      id="entire-page"
    >
      <figure>
      <Container
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

      <img
          src={logo}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "40px",
            marginTop: "50px",
            marginBottom: "200px",
          }}
        />
      <figcaption
        style={{
          color: "rgb(0, 0, 0)",
          height: "auto",
          width: "auto",
          position: "absolute",
          "font-size": "20px",
          "font-style": "Regular",
          "font-family": "Urbanist",
          left: 0,
          right: 0,
          margin: "auto",
          marginTop: "200px",
          textAlign: "center",
        }}
      >
          Welcome to neufood!
          <br />
          We help shared households save money by:
          <br />
          • Tracking pantry inventory
          <br />
          • Recommending ways to fully utilize ingredients
        </figcaption>

      </Container>
        <Container>
          <h3>Here's How</h3>
          <Link
        activeClass="active"
        to="firstSection"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
      >
        <BouncingArrow onClick={scrollToTop} />
      </Link>
       
        </Container>

        <Container name = "firstSection">
          <h3> 1. Create an Account </h3>
        </Container>

        <Container>
        <img src={account}
       />
        </Container>

        <Container>
        <h3>2. Create a pantry and add your household members as contributors </h3>
        </Container>

        <Container>
        <img src={network}/>
        </Container>

        <Container>
       < h3> 3. Add your ingredients to your shared Pantry </h3>
        </Container>

        <Container>
        <img src={time}/>
        </Container>

        <Container>
        <h3> 4. Utilized the Recipe Recommendation </h3>
        </Container>

        <Container>
          <img src={recipe}/>
        </Container>


        <Container>
        <h3>Ready to get started?</h3>
        <a href="/signin">
          <button class="signIn-btn">Sign Up</button> 
        </a>
          <br></br>
          <br></br>
          <br></br>
          
        </Container>
  
      </figure>
    </div>
  );
};

export default Home;
