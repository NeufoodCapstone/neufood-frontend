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
import Modal from "../components/Modal";
import "./ingredients.css";

const Ingredients = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const [inputs, setInputs] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Dairy");
  const [quantity, setQuantity] = useState("");
  const [activeTab, setActiveTab] = useState("first");
  const [pantryList, setPantryList] = useState([]);
  const [displayedPantry, setDisplayedPantry] = useState(
    queryParams.get("pantry") ? queryParams.get("pantry") : "All"
  );
  const [changePantryId, setChangePantryId] = useState(null);
  const [changeSelectedPantry, _] = useState("");
  const [hasChangedIngredient, setHasChangedIngredient] = useState(false);
  const [newIngredientExpirationDate, setNewIngredientExpirationDate] =
    useState(new Date());
  const [hasSetExpirationDate, setHasSetExpirationDate] = useState(false);
  const [selectedPantry, setSelectedPantry] = useState(
    queryParams.get("pantry") ? queryParams.get("pantry") : "All"
  );
  const [loading, setLoading] = useState(false);
  const [loadingPantryChange, setLoadingPantryChange] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const [flippedCards, setFlippedCards] = useState([]);

  const handleFlip = (_id) => {
    setSelectedIngredient(_id);
  };

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

  const handleCardClick = (e, pantry_id) => {
    // Check if the click happened on the "View Ingredients" button
    if (e.target.classList.contains("view-ingredients-btn")) {
      // Clicked on the "View Ingredients" button, handle accordingly
      viewIngredients(e, pantry_id);
    } else {
      setFlippedCards((prev) =>
        prev.includes(pantry_id)
          ? prev.filter((id) => id !== pantry_id)
          : [...prev, pantry_id]
      );
      // Clicked elsewhere on the card, handle the click as needed
      // For example, you can choose to do nothing or navigate to a different page
      // window.location.href = '/some-other-page';
    }
  };

  const url = process.env.MONGODB_URL;
  const urlB = config.url.API_HOME;

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
    const daysToAdd = expirationMap.get(category) || 0;
    defaultExpirationDate.setDate(currentDate.getDate() + daysToAdd);
    try {
      setLoading(true);
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
      popupState2.close();
      setHasChangedIngredient(!hasChangedIngredient);
      setName("");
      setPrice("");
      setCategory("Dairy");
      setQuantity("");
      setNewIngredientExpirationDate(new Date());
      setHasSetExpirationDate(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = async (ingredients_id, pantry_id) => {
    try {
      setLoadingPantryChange(true); // Set loading state
      await axios.put(
        `${urlB}/ingredients/pantry/${ingredients_id}/${
          pantry_id ? pantry_id : "null"
        }`
      );
      setHasChangedIngredient(!hasChangedIngredient);
      setChangePantryId("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPantryChange(false); // Reset loading state
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

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter inputs based on search input
  const filteredInputs = inputs.filter((input) =>
    input.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const getIngredientImage = (category) => {
    // Dynamically import the image based on the category
    try {
      const image = require(`../imgs/ingredients/${category.toLowerCase()}.png`);
      return image; // Use .default because of how require works with ES6 modules
    } catch (error) {
      // Handle error (e.g., image not found)
      console.error(`Error loading image for category ${category}:`, error);
      return null;
    }
  };
  const handlePantryButtonClick = async (pantry_id) => {
    setLoadingPantryChange(true); // Set loading state
    setSelectedPantry(pantry_id);
    setDisplayedPantry(pantry_id);
    try {
      const response = await fetch(`${urlB}/${uid}/ingredients/`);
      const jsonData = await response.json();
      setInputs(
        jsonData.filter(
          (input) => pantry_id === "All" || input.related_pantry === pantry_id
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPantryChange(false); // Reset loading state
    }
  };

  return (
    <Fragment>
      <div className="page">
        {isHelpModalOpen && (
          <Modal
            open={isHelpModalOpen}
            closeButtonText={"Close"}
            onClose={() => setIsHelpModalOpen(false)}
            actionContent={
              <video
                width="285"
                src="https://drive.google.com/uc?export=download&id=1XnneYEjER3vb3-Z1ihLZkEHERehyui2H"
                controls
              />
            }
            dialogTitle={"Help with Ingredients"}
          />
        )}
        <Container>
          <div className="header-container">
            <div className="logo-title-container">
              <img className="img-logo-position" src={logo} alt="Logo" />
              <div className="title-space">Ingredients</div>
            </div>
          </div>
        </Container>

        <Container className="input-box">
          <figcaption className="page-name">
            Add your Ingredient details and track your expiration dates
          </figcaption>

          <button
            className="help-button"
            onClick={() => setIsHelpModalOpen(true)}
          >
            Help
          </button>
        </Container>
        <div className="custom-tabs2">
          <button
            className="button add-ingredient"
            variant="contained"
            {...bindTrigger(popupState2)}
          >
            Add Ingredient
          </button>
        </div>

        <Menu {...bindMenu(popupState2)} className="menu">
          <Card className="add-ingredient-card custom-card">
            <h2 className="card-title">Add Ingredient</h2>
            <form onSubmit={onSubmitForm}>
              <label htmlFor="itemName" className="name">
                Item Name:
              </label>
              <input
                type="text"
                id="itemName"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="foodinput"
              />

              <label htmlFor="itemName" className="name">
                Price (In Dollars):
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="foodinput"
              />
              <label htmlFor="price" className="name">
                Expiration Date:
              </label>
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
              <label htmlFor="quantity" className="name">
                Quantity:
              </label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="foodinput"
              />
              <label htmlFor="Category" className="name">
                Category:
              </label>
              <select
                className="foodinput"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select</option>
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
              <button className="addButton" type="submit">
                {" "}
                Add
              </button>
            </form>
          </Card>
        </Menu>

        <div
          className="custom-tabs"
          activeKey={activeTab}
          onSelect={handleTabChange}
        >
          <button
            className={`button all-ingredients ${
              selectedPantry === "All" ? "selected" : ""
            }`}
            title="All Ingredients"
            onClick={() => handlePantryButtonClick("All")}
          >
            All Ingredients
          </button>
          {pantryList.map((pantry) => {
            console.log("things", selectedPantry, pantry._id);
            return (
              <button
                className={`button pantries ${
                  selectedPantry === pantry._id ? "selected" : ""
                }`}
                onClick={() => handlePantryButtonClick(pantry._id)}
                key={pantry._id}
              >
                {pantry.name}
              </button>
            );
          })}
        </div>
        <div className="flex-container">
          {/* Search bar */}
          <div className="search-bar">
            <input
              className="search"
              type="text"
              placeholder="Search here"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {loading || loadingPantryChange ? (
            <div className="loading-icon">Loading...</div>
          ) : (
            inputs
              .filter(
                (input) =>
                  displayedPantry === "All" ||
                  input.related_pantry === displayedPantry
              )
              .filter((input) =>
                input.name.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((input) => {
                return (
                  <div
                    className={`ingredient-flex ${
                      flippedCards.includes(input._id) ? "flipped" : ""
                    }`}
                    key={input._id}
                    onClick={(e) => handleCardClick(e, input._id)}
                  >
                    <div className="ingredient-buttons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M13.1063 6.90967L13.8134 7.61678L14.5205 6.90967L15.448 5.98217C15.4482 5.98201 15.4483 5.98184 15.4485 5.98167C16.4828 4.9514 17.8833 4.37292 19.3432 4.37292C20.8026 4.37292 22.2026 4.95101 23.2369 5.98065C24.2673 7.01639 24.8458 8.418 24.8458 9.87907C24.8458 11.3404 24.2671 12.7422 23.2363 13.778C23.2361 13.7783 23.2358 13.7786 23.2355 13.7788L13.8134 23.201L4.39127 13.7788C4.391 13.7786 4.39072 13.7783 4.39045 13.778C3.35968 12.7422 2.78101 11.3404 2.78101 9.87907C2.78101 8.41805 3.35945 7.01648 4.38982 5.98075C5.42407 4.95105 6.8241 4.37292 8.28359 4.37292C9.74351 4.37292 11.1439 4.9514 12.1783 5.98167C12.1785 5.98184 12.1786 5.98201 12.1788 5.98217L13.1063 6.90967Z"
                          stroke="black"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                    <img
                      src={getIngredientImage(input.category)}
                      alt={`${input.category} Image`}
                      className="ingredient-image"
                    />
                    <div className="ingredient-name">{input.name}</div>
                    <br></br>
                    <div className="amount">
                      Q:
                      <span>{input.quantity}</span>
                      <button
                        className="use-button"
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecrement(input._id, input.quantity - 1);
                        }}
                      >
                        Use
                      </button>
                    </div>
                    <div
                      className={`back-content ${
                        flippedCards.includes(input._id) ? "visible" : ""
                      }`}
                    >
                      <div className="bcontent">
                        <div className="owner">
                          Owner: {input.owner.split(" ")[0]}{" "}
                        </div>
                        <div className="collaborators">
                          Quantity: {input.quantity}{" "}
                        </div>
                        <div className="collaborators">
                          Price: ${input.price}{" "}
                        </div>
                        <div className="collaborators">
                          Expiration Date:{" "}
                          {input.expiration_date.substring(0, 10)}{" "}
                        </div>
                        <button
                          className="delete-button"
                          variant="contained"
                          onClick={(e) => {
                            e.stopPropagation();
                            setChangePantryId(input._id);
                          }}
                        >
                          Change Pantry
                        </button>
                        {changePantryId === input._id && (
                          <select
                            id="dropdown"
                            value={changeSelectedPantry}
                            onChange={(e) => {
                              handleSelectChange(input._id, e.target.value);
                              handleCardClick(e, input._id);
                            }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(input._id);
                          }}
                        >
                          Delete
                        </button>
                        <br />
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Ingredients;
