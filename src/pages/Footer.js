import React from "react";
import { CDBBox } from "cdbreact";
import logo from "./logo-transparent.png";

export default function Footer() {
  return (
    <div
      style={{
        backgroundColor: "#6DA34D",
        position: "relative",
        bottom: "0",
        width: "100%",
        padding: "0px", // Adjust the padding for the green footer
      }}
    >
      <CDBBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: "80%" }}
      >
        <CDBBox display="flex" alignItems="center" justifyContent="center">
          <img
            alt="logo"
            src={logo}
            style={{ maxWidth: "100px", height: "auto" }} // Adjust the maxWidth for the image
          />
        </CDBBox>
        <CDBBox></CDBBox>
      </CDBBox>
    </div>
  );
}
