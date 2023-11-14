import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const goToPantry = (e) => {
    e.preventDefault();
    window.location.href = "/ingredients";
  };

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
  const [flippedCards, setFlippedCards] = useState([]);

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

  const submitNewMember = (pantry_id) => {
    const temp = [];

    const myRequest = new Request(
      `${baseURL}/pantry/${pantry_id}/${addedUser}/${loginData.getItem(
        "loginID"
      )}`,
      {
        method: "POST",
        mode: "no-cors",
        credentials: "include",
        body: "null",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
        backgroundColor: "#F5EFED",
      }}
    >
      <div
        style={{
          display: "inline-block",
          marginBottom: "150px",
        }}
      >
        <img className="header-img-ctn" src={neufoodLogo} />
        <br />
        <figcaption>Pantries</figcaption>
        <br></br>
        <div className="txt-ctn">
          <div className="txt-font-style">
            {" "}
            Create a new pantry + add your housemates!
          </div>
        </div>
        <button
          className="button signin"
          variant="contained"
          {...bindTrigger(popupstate)}
        >
          Add Pantry
        </button>
      </div>
      <Menu {...bindMenu(popupstate)}>
        <Container className="join-container">
          <Card className="join-card">
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  name="name"
                  className="join-form"
                  placeholder="Pantry name"
                />
                <button className="button-3 join-btn" type="submit">
                  Add New Pantry
                </button>
              </form>
            </Card.Body>
          </Card>
        </Container>
      </Menu>

      <br />
      <br />
      <br />

      {pantryList.map((data) => (
        <p key={data._id}>
          <Container className="pantry-container">
            <div className={`pantry-card ${flippedCards.includes(data._id) ? 'flipped' : ''}`} onClick={() => setFlippedCards((prev) => (prev.includes(data._id) ? prev.filter(id => id !== data._id) : [...prev, data._id]))}>
              <Menu {...bindMenu(addNewMember)}>
                <Container className="inner-pantry-container">
                  <Card className="inner-pantry-card">
                    <Card.Body>
                      <form onSubmit={() => submitNewMember(data._id)}>
                        <Form.Control
                          type="text"
                          name="name"
                          className="join-form"
                          placeholder="Enter Valid Email:"
                        />
                        <button className="button-3 join-btn" type="submit">
                          Add Member
                        </button>
                      </form>
                    </Card.Body>
                  </Card>
                </Container>
                </Menu>
              <div className="rect-info-ctn">
                <div className="pantry-name" onClick={goToPantry}>
                  {data.name}
                </div>
                Owner: {data.owner} <br /> Collaborators: {data.member_list.length} <br />{' '}
                <button
                  className="add-new-membr-btn"
                  variant="contained"
                  {...bindTrigger(addNewMember)}
                >
                  Add Member
                </button>
                <div className="mb-3">
                  <button
                    className="button-3 trash-btn-style"
                    onClick={() => handleDelete(data._id)}
                    name="btn2"
                    value="supposed to delete"
                  >
                    <BsTrashFill />
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </p>
      ))}
    </div>
  );
}

export default Pantry;