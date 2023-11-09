import Menu from "@mui/material/Menu";
import axios from "axios";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { config } from "../Constants";
import logo from "../imgs/logo-no-text.png";
import "./ingredients.css";

const Ingredients = () => {
  const [inputs, setInputs] = useState([]); // initialize as an empty array
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Dairy");
  const [quantity, setQuantity] = useState("");
  const [activeTab, setActiveTab] = useState("first");
  const [pantryList, setPantryList] = useState([]);
  const [displayedPantry, setDisplayedPantry] = useState("All");
  const [changePantryId, setChangePantryId] = useState(null);
  const [changeSelectedPantry, _] = useState("");
  const [hasChangedIngredient, setHasChangedIngredient] = useState(false);
  const [newIngredientExpirationDate, setNewIngredientExpirationDate] =
    useState(new Date());
  const [hasSetExpirationDate, setHasSetExpirationDate] = useState(false);

  const expirationMap = new Map([
    ["Dairy", 7],
    ["Fruits", 14],
    ["Vegetables", 14],
    ["Grains", 365],
    ["Protein", 3],
    ["Oils", 365],
    ["Condiments", 180],
    ["Snacks", 30],
    ["Desserts", 7],
    ["Drinks", 365],
    ["Spices", 365],
    ["Spreads", 90],
    ["Other", 14],
  ]);

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
  }, [displayedPantry, hasChangedIngredient]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const defaultExpirationDate = new Date(currentDate);
    const daysToAdd = expirationMap.get(category)
      ? expirationMap.get(category)
      : 0;
    defaultExpirationDate.setDate(currentDate.getDate() + daysToAdd);
    try {
      await fetch(
        `${urlB}/ingredients/${name ? name : "Ingredient Name"}/${
          price !== "" ? price : 0
        }/${category ? category : "Dairy"}/${
          quantity !== "" ? quantity : 1
        }/${uid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            expiration_date: hasSetExpirationDate
              ? newIngredientExpirationDate
              : defaultExpirationDate,
          }),
        }
      );
      setHasChangedIngredient(!hasChangedIngredient);
      setName("");
      setPrice("");
      setCategory("Dairy");
      setQuantity("");
      setNewIngredientExpirationDate(new Date());
      setHasSetExpirationDate(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectChange = async (ingredients_id, pantry_id) => {
    try {
      await axios.put(
        `${urlB}/ingredients/pantry/${ingredients_id}/${
          pantry_id ? pantry_id : "null"
        }`
      );
      setHasChangedIngredient(!hasChangedIngredient);
      setChangePantryId("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${urlB}/ingredients/${id}`);
      setHasChangedIngredient(!hasChangedIngredient);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIncrement = async (_id, newAmount) => {
    try {
      await axios.put(`${urlB}/ingredients/${_id}/${newAmount}`);
      setHasChangedIngredient(!hasChangedIngredient);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrement = async (_id, newAmount) => {
    if (newAmount <= 0) {
      try {
        await axios.delete(`${urlB}/ingredients/${_id}`);
        setHasChangedIngredient(!hasChangedIngredient);
      } catch (err) {
        return console.error(err);
      }
    }
    try {
      await axios.put(`${urlB}/ingredients/${_id}/${newAmount}`);
      setHasChangedIngredient(!hasChangedIngredient);
    } catch (err) {
      console.error(err);
    }
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
                    type="date"
                    name="Expiration Date"
                    value={newIngredientExpirationDate}
                    placeholder="Price"
                    onChange={(e) => {
                      setHasSetExpirationDate(true);
                      setNewIngredientExpirationDate(e.target.value);
                    }}
                    className="foodinput"
                  />
                  <p>Expiration Date</p>
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
                  onClick={() => handleDecrement(input._id, input.quantity - 1)}
                >
                  &#8722;
                </button>
                <button
                  className="arrow-button"
                  onClick={() =>
                    handleIncrement(input._id, Number(input.quantity) + 1)
                  }
                >
                  &#43;
                </button>
              </div>
              <div>Category: {input.category}</div>
              <div>Purchase Date: {input.date.substring(0, 10)}</div>
              {input.expiration_date && (
                <div>
                  Expiration Date: {input.expiration_date.substring(0, 10)}
                </div>
              )}
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
