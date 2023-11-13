import React from "react";
import { CDBBox } from "cdbreact";
import logo from "./logo-transparent.png";
export default function Footer() {
  return (
    <div
      style={{
        "margin-top": 8,
        backgroundColor: "#6DA34D",
        bottom: "0",
        width: "100%",
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
          <img alt="logo" src={logo} width="100px" />
        </CDBBox>
        <CDBBox></CDBBox>
      </CDBBox>
    </div>
  );
}
