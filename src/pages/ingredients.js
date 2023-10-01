import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import logo from "../imgs/logo-no-text.png";
import { Container } from "react-bootstrap";
import { config } from "../Constants";
import "./ingredients.css";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import Menu from "@mui/material/Menu";
import Card from "react-bootstrap/Card";
import { Tabs, Tab } from "react-bootstrap";

const Ingredients = () => {
  const [inputs, setInputs] = useState([]); // initialize as an empty array
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [activeTab, setActiveTab] = useState("first");
  const [pantryList, setPantryList] = useState([]);

  const url = process.env.MONGODB_URL;
  var urlB = config.url.API_HOME;

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const loginData = JSON.parse(localStorage.getItem("loginData"));
  if (loginData == null) window.location.href = "/signin";
  const uid = loginData.id;

  const getInputs = async () => {
    const response = await fetch(`${urlB}/${uid}/ingredients/`);
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
      `${urlB}/ingredients/${name}/${price}/${category}/${quantity}/${uid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const handleDelete = async (id) => {
    await axios.delete(`${urlB}/ingredients/${id}`);
    setInputs(inputs.filter((ingredient) => ingredient._id !== id));
  };

  const handleIncrement = async (_id, currentAmount) => {
    ++currentAmount;

    axios
      .put(`${urlB}/ingredients/${_id}/${currentAmount}`)
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating ingredient:", error);
      });

    window.location.reload();
  };

  const handleDecrement = async (_id, currentAmount) => {
    --currentAmount;

    axios
      .put(`${urlB}/ingredients/${_id}/${currentAmount}`)
      .then((response) => {
        console.log("Ingredient updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating ingredient:", error);
      });

    window.location.reload();
  };

  const user = localStorage.getItem("loginID");

  const baseURL =
    urlB +
    "/" +
    encodeURIComponent(user).replace("%22", "").replace("%22", "") +
    "/pantry";

  console.log(baseURL);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPantryList(response.data);
    });
  }, []);

  if (!pantryList) setPantryList([]);

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
          className="custom-tabs"
          activeKey={activeTab}
          onSelect={handleTabChange}
        >
          {pantryList.map((pantry) => (
            <Tab title={pantry.name}></Tab>
          ))}
        </Tabs>
        <div className="flex-container">
          {inputs.map((input) => {
            return (
              <div className="ingredient-flex">
                <div className="ingredient-name">{input.name}</div>
                <br></br>
                <div>Owner: {input.owner}</div>
                <div>
                  Quantity:
                  <span className="amount">{input.quantity}</span>
                  <button
                    className="arrow-button"
                    onClick={() => handleDecrement(input._id, input.quantity)}
                  >
                    &#8722;
                  </button>
                  <button
                    className="arrow-button"
                    onClick={() => handleIncrement(input._id, input.quantity)}
                  >
                    &#43;
                  </button>
                </div>
                <div>Category: {input.category}</div>
                <div className="price">Price: ${input.price}</div>
                <button className="delete-button" variant="contained">
                  Share
                </button>
                <button
                  className="delete-button"
                  variant="contained"
                  onClick={() => handleDelete(input._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Ingredients;
