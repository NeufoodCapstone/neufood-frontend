import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import logo from "../imgs/logo-no-text.png";
import apple from "../imgs/apple2.png";
import { Container } from "react-bootstrap";
import "./ingredients.css";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import Menu from "@mui/material/Menu";
import Card from "react-bootstrap/Card";
import { Tabs, Tab } from "react-bootstrap";
import { config } from "../Constants";

const Ingredients = () => {
  var baseURL = config.url.API_HOME;
  const [inputs, setInputs] = useState([]); // initialize as an empty array
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [activeTab, setActiveTab] = useState("first");

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const loginData = JSON.parse(localStorage.getItem("loginData"));
  if (loginData == null) window.location.href = "/signin";
  const uid = loginData.id;

  const getInputs = async () => {
    const response = await fetch(`${baseURL}/${uid}/ingredients/`);
    const jsonData = await response.json();

    setInputs(jsonData);
  };

  const popupState2 = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });

  useEffect(() => {
    getInputs();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${baseURL}/ingredients/${name}/${price}/${category}/${quantity}/${uid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const handleDelete = async (id) => {
    await axios.delete(`${baseURL}/ingredients/${id}`);
    setInputs(inputs.filter((ingredient) => ingredient._id !== id));
  };

  return (
    <Fragment>
      <div className="page">
        <Container className="input-box">
          <img className="logo-img" src={logo} />
          <figcaption className="page-name">Ingredients</figcaption>
        </Container>
        <div>
          <div className="btn-create-new-ctn">
            <div className="border-ctn">
              <div className="txt-ctn">
                <div className="txt-font-style">
                  {" "}
                  Ingredients can be private or public <br></br> and shared
                  between pantries
                </div>
              </div>
              <button
                class="button signin"
                variant="contained"
                {...bindTrigger(popupState2)}
              >
                Add Ingredient
              </button>
            </div>
          </div>
        </div>
        <Menu {...bindMenu(popupState2)}>
          <Container className="popup">
            <Card className="popup-one">
              <Card.Body>
                <form onSubmit={onSubmitForm}>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Ingredient name"
                    onChange={(e) => setName(e.target.value)}
                    className="foodinput"
                  />
                  <input
                    type="number"
                    name="price"
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    className="foodinput"
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    placeholder="Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    className="foodinput"
                  />
                  <select
                    className="foodinput"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Dairy</option>
                    <option>Fruits</option>
                    <option>Vegetables</option>
                    <option>Grains</option>
                    <option>Protein</option>
                    <option>Oils</option>
                    <option>Condiments</option>
                    <option>Snacks</option>
                    <option>Desserts</option>
                    <option>Drinks</option>
                    <option>Spices</option>
                    <option>Spreads</option>
                    <option>Other</option>
                  </select>
                  <br></br>
                  <button className="button-style" type="submit">
                    {" "}
                    Add
                  </button>
                </form>
              </Card.Body>
            </Card>
          </Container>
        </Menu>
        <Tabs
          activeKey={activeTab}
          onSelect={handleTabChange}
          className="custom-tabs"
        >
          <Tab eventKey="first" title="All">
            <div className="flex-container">
              {inputs.map((input) => {
                return (
                  <div className="ingredient-flex">
                    <img src={apple} className="ingredient-img" />
                    <div className="ingredient-name">{input.name}</div>
                    <br></br>
                    <div>Owner: {input.owner}</div>
                    <div>Quantity: {input.quantity}</div>
                    <div>Category: {input.category}</div>
                    <div className="price">Price: ${input.price}</div>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(input._id)}
                      name="btn2"
                      value="supposed to delete"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </Tab>
          <Tab eventKey="second" title="484 Birkel">
            <div className="empty-tab"></div>
          </Tab>
          <Tab eventKey="third" title="Mom's House">
            <div className="empty-tab"></div>
          </Tab>
        </Tabs>
      </div>
    </Fragment>
  );
};

export default Ingredients;
