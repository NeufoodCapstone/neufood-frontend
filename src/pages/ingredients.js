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
  const [displayedPantry, setDisplayedPantry] = useState("All");
  const [changePantryId, setChangePantryId] = useState(null);
  const [changeSelectedPantry, _] = useState("");
  const [hasChangedPantry, setHasChangedPantry] = useState(false);

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
    setInputs(
      jsonData.filter(
        (input) =>
          displayedPantry === "All" || input.related_pantry === displayedPantry
      )
    );
  };

  const popupState2 = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });

  useEffect(() => {
    getInputs();
  }, [displayedPantry, hasChangedPantry]);

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

  const handleSelectChange = async (ingredients_id, pantry_id) => {
    try {
      await axios.put(
        `${urlB}/ingredients/pantry/${ingredients_id}/${
          pantry_id ? pantry_id : "null"
        }`
      );
      setHasChangedPantry(!hasChangedPantry);
      setChangePantryId("");
    } catch (err) {
      console.error(err);
    }
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
      .then((_) => {})
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

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPantryList(response.data);
    });
  }, []);

  if (!pantryList) setPantryList([]);

  const getPantryName = (pantry_id) => {
    const foundPantry = pantryList.find((pantry) => pantry._id === pantry_id);
    return foundPantry ? foundPantry.name : "None";
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
        <div
          className="custom-tabs"
          activeKey={activeTab}
          onSelect={handleTabChange}
        >
          <button
            className="button"
            title="All Ingredients"
            onClick={() => setDisplayedPantry("All")}
          >
            All Ingredients
          </button>
          {pantryList.map((pantry) => (
            <button
              className="button"
              onClick={() => setDisplayedPantry(pantry._id)}
              key={pantry._id}
            >
              {pantry.name}
            </button>
          ))}
        </div>
        <div className="flex-container">
          {inputs.map((input) => (
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
              <div>
                Pantry:{" "}
                {input.related_pantry
                  ? getPantryName(input.related_pantry)
                  : "None"}
              </div>
              <div className="price">Price: ${input.price}</div>
              <button
                className="delete-button"
                variant="contained"
                onClick={() => setChangePantryId(input._id)}
              >
                Change Pantry
              </button>
              {changePantryId === input._id && (
                <select
                  id="dropdown"
                  value={changeSelectedPantry}
                  onChange={(e) =>
                    handleSelectChange(input._id, e.target.value)
                  }
                >
                  <option key={-2} value={""}>
                    Select a pantry
                  </option>
                  <option key={-1} value={""}>
                    None
                  </option>
                  {pantryList.map((pantry) => (
                    <option key={pantry._id} value={pantry._id}>
                      {pantry.name}
                    </option>
                  ))}
                </select>
              )}
              <button
                className="delete-button"
                variant="contained"
                onClick={() => handleDelete(input._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Ingredients;
