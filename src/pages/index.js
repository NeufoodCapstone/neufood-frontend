import React from "react";
import cook from "./jdoawpiadoioawu.png";
import logo from "./logo-transparent.png";
import collorate from "./image1131-9sda-300h.png";
import receipt from "./image2130-vkrr-300h.png";
import calendar from "./calendar.png";
import Container from "react-bootstrap/Container";
import "./about.css";

const Home = () => {
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
        </Container>
        <Container
          style={{
            width: "100%",
            position: "relative",
            height: "200px",
            display: "table",
          }}
        >
          
          <img
            src={collorate}
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              width: "250px",
              padding: "10px",
              borderRadius: "40px",
            }}
          />
          <figcaption
            style={{
              top: "10%",
              color: "rgb(0, 0, 0)",
              width: "250px",
              position: "absolute",
              fontSize: "20px",
              fontStyle: "Regular",
              textAlign: "left",
              fontFamily: "Urbanist",
              padding: "20px",
              height: "center",
              transform: "translate(-60%, 20%)"              
            }}
          >
            Categorize ingredients as shared or private
          </figcaption>
        </Container>
        <Container
          style={{
            width: "100%",
            position: "relative",
            height: "200px",
            display: "table",
          }}
        >
          <img
            src={receipt}
            style={{
              position: "absolute",
              top: "10%",
              right: "50%",
              width: "250px",
              padding: "10px",
            }}
          />
          <figcaption
            style={{
              color: "rgba(174, 145, 39, 1)",
              top: "10%",
              left: "50%",
              color: "rgb(0, 0, 0)",
              width: "250px",
              height: "auto",
              position: "absolute",
              fontSize: "20px",
              alignSelf: "auto",
              fontStyle: "Regular",
              textAlign: "left",
              fontFamily: "Urbanist",
              padding: "10px",
              transform: "translate(10%, 60%)",
            }}
          >
            Easily edit and view pantry details
          </figcaption>
        </Container>
        <Container
          style={{
            width: "100%",
            position: "relative",
            height: "200px",
            display: "table",
          }}
        >
          <img
            src={calendar}
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              width: "250px",
              padding: "10px",
              borderRadius: "40px",
            }}
          />
          <figcaption
            style={{
              color: "rgba(174, 145, 39, 1)",
              top: "10%",
              right: "50%",
              color: "rgb(0, 0, 0)",
              width: "250px",
              height: "auto",
              position: "absolute",
              fontSize: "20px",
              alignSelf: "auto",
              fontStyle: "Regular",
              textAlign: "left",
              fontFamily: "Urbanist",
              padding: "20px",
              transform: "translate(-60%, 20%)",
            }}
          >
            Keep track of ingredient purchase details
          </figcaption>
        </Container>
        <Container
          style={{
            width: "100%",
            position: "relative",
            height: "200px",
            display: "table",
          }}
        >
          <img
            src={cook}
            style={{
              height: "180px",
              position: "absolute",
              top: "10%",
              right: "50%",
              width: "180px",
              padding: "10px",
              borderRadius: "40px",
            }}
          />
          <figcaption
            style={{
              top: "10%",
              left: "50%",
              color: "rgb(0, 0, 0)",
              width: "250px",
              height: "auto",
              position: "absolute",
              fontSize: "20px",
              alignSelf: "auto",
              fontStyle: "Regular",
              textAlign: "left",
              fontFamily: "Urbanist",
              padding: "10px",
              transform: "translate(10%, 60%)",
            }}
          >
            Plan meals together and maintain a cleaner fridge!
          </figcaption>
        </Container>
        <h3>Ready to get started?</h3>
        <a href="/signin">
          <button class="button signin">Sign Up</button>
        </a>
      </figure>
    </div>
  );
};

export default Home;
