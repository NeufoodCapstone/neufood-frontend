import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import "./button.css";
import "./about.css";
import Card from "react-bootstrap/Card";
import neufoodLogo from "../imgs/logo-no-text.png";
import defaultImg from "../imgs/pantry/pantry-card-img.jpeg";
import { config } from "../Constants";
import "reactjs-popup/dist/index.css";
import Menu from "@mui/material/Menu";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

import "./pantry.css";

var url = config.url.API_HOME;

function Pantry() {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  if (loginData == null) window.location.href = "/signin";

  const goToPantry = e => {
    e.preventDefault();
    window.location.href = "/ingredients";
  }

  const user = localStorage.getItem("loginID");
  const [pantryList, setPantryList] = useState([]);
  const popupstate = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });
  const addNewMember = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });

  const [addedUser, setAddedUser] = useState("");

  const baseURL =
    url +
    "/" +
    encodeURIComponent(user).replace("%22", "").replace("%22", "") +
    "/pantry";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPantryList(response.data);
    });
  }, []);

  if (!pantryList) setPantryList([]);

  const handleDelete = async (id) => {
    await axios.delete(`${url}/pantry/${id}`);
    setPantryList(pantryList.filter((pantry) => pantry._id !== id));
  };



  //add pantry
  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    const temp = [];
    for (let [key, value] of formData.entries()) {
      temp.push(value);
      console.log(key, value);
    }
    const urls =
      url +
      "/pantry/" +
      temp[0] +
      "/" +
      encodeURIComponent(user).replace("%22", "").replace("%22", "");

    const myRequest = new Request(urls, {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      body: "null",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch(myRequest)
      .then(function (response) {
        window.location.reload();
        console.log(response);
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  //add member
  const submitNewMember = (pantry_id) => {
    const temp = [];

    const myRequest = new Request(`http://localhost:8080/pantry/${pantry_id}/${addedUser}/${loginData.getItem("loginID")}`, {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      body: "null",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch(myRequest)
      .then(function (response) {
        window.location.reload();
        console.log(response);
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  return (
    <div
      style={{
        "background-color": "#F5EFED",
      }}
    >
      <img class="header-img-ctn" src={neufoodLogo} />
      <figcaption> Pantries</figcaption>

      <div className="btn-create-new-ctn">
        <div className="border-ctn">
          <div className="txt-ctn">
            <div className="txt-font-style">
              {" "}
              Create and edit pantries to{" "}
              <span style={{ fontWeight: 1000 }}>track </span> your ingredients, or join a new!
            </div>
          </div>
          <button
            class="button signin"
            variant="contained"
            {...bindTrigger(popupstate)}
          >
            Join New
          </button>
        </div>
      </div>
      <Menu {...bindMenu(popupstate)}>
        <Container
          style={{
            padding: "20px",
            display: "flex",
            width: "100%",
            "justify-content": "center",
            "align-items": "center",
          }}
        >
          <Card
            style={{
              width: "18rem",
              "justify-content": "center",
              "align-items": "center",
              "flex-wrap": "wrap",
              "z-index": 0,
            }}
          >
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  name="name"
                  style={{
                    width: 200,
                    left: "15%",
                    margin: 5,
                    borderRadius: "50px",
                  }}
                  placeholder="Pantry name"
                />
                <button
                  class="button-3"
                  style={{
                    margin: 5,
                    width: "10vw",
                    left: "15%",
                    borderRadius: "50px",
                  }}
                  type="submit"
                >
                  Add New Pantry
                </button>
              </form>
            </Card.Body>
          </Card>
        </Container>
      </Menu>

    

    {/* end to add a new member */}

      {pantryList.map((data) => (
        <p>
          {" "}
          <Container
            style={{
              display: "flex",
              width: "100%",
              "justify-content": "center",
              padding: 5,
              color: "green",
            }}
          >
            <Card

              style={{
                width: "60vw",
                paddingRight: "30%",
                justifyContent: "center",
                alightContent: "center",
                flexWrap: "wrap",
                zIndex: 0,
                height: "40vh" /* main card */,
                paddingBottom: "2%",
                paddingTop: "2%",
                borderRadius: "50px",
              }}
            >

              {/* start to add a new member */}
     <Menu {...bindMenu(addNewMember)}>
        <Container
          style={{
            padding: "20px",
            display: "flex",
            width: "100%",
            "justify-content": "center",
            "align-items": "center",
          }}
        >
          <Card
            style={{
              width: "18rem",
              "justify-content": "center",
              "align-items": "center",
              "flex-wrap": "wrap",
              "z-index": 0,
            }}
          >
            <Card.Body>
              <form onSubmit={() => submitNewMember(data._id)}>
                <Form.Control
                  type="text"
                  name="name"
                  style={{
                    width: 200,
                    left: "15%",
                    margin: 5,
                    borderRadius: "50px",
                  }}
                  placeholder="Enter Valid Email:"
                />
                <button
                  class="button-3"
                  style={{
                    justifyContent: "center",
                    margin: 5,
                    width: "10vw",
                    left: "15%",
                    borderRadius: "50px",
                  }}
                  type="submit"
                >
                  Add Member
                </button>
              </form>
            </Card.Body>
          </Card>
        </Container>
      </Menu>
             
   
                <img class="pantry-img-ctn" src={defaultImg} alt="default pantry img"/>
      
           
              <div className="rect-info-ctn">
                <div className="rect-outline" onClick={goToPantry}>
                  <div className="pantry-name">{data.name}</div>
                </div>
                <div className="card-info-txt">
                  Owner: {data.owner} <br></br> Contributors: 2 <br></br>     {/* contributors 2 needs to be changed to acutally do a call with a data. something */}
                    <button
                      class="add-new-membr-btn"
                      variant="contained"
                      {...bindTrigger(addNewMember)}
                    >
                      Add Member
                    </button>
               
                </div>
              </div>

              <div className="mb-3">
                <button
                  class="button-3"
                  className="trash-btn-style"
                  onClick={() => handleDelete(data._id)}
                  name="btn2"
                  value="supposed to delete"
                >
                  <BsTrashFill />
                </button>
              </div>
            </Card>
          </Container>
        </p>
      ))}
    </div>
  );
}
export default Pantry;
