import React from "react";
import axios from "axios";
// Component.js
import { config } from "../Constants";
var url = config.url.API_HOME;

let recipeList = [
  {
    name: "RecipeName",
    ingredients: "Recipe Ingredients",
    preperation: "Recipe Prep",
    nutrition: "Recipe nutrition",
  },
  {
    name: "example",
    ingredients: "example",
    preperation: "example",
    nutrition: "or is it??",
  },
  {
    name: "long recipe",
    ingredients:
      "Tomatos, peppers, beef, chicken stock, salt, pepper, 13 eggs, garlic, butter, vegtable oil",
    preperation:
      "1. add this to the table, 2. hope this will fit in a nice way, 3. no it doesn't, 4. Someone help me make this look nice, 5. this is very long example so forgive me lord, 6. ahhhhhh, kitchen on fire",
    nutrition: "13mg of hope, 17g of despair",
  },
];
//const data = recipeList;

const Recipe = () => {
  /* Yiqun do not touch code from HERE */
  // authenticate user first
  const authURL = url + "/auth";

  const logout = () => {
    axios.get(url + "/logout").then((response) => {
      console.log("clean cookie");
    });
    localStorage.removeItem("loginData"); //remove localstorage data user name.
    localStorage.removeItem("loginID");
    localStorage.removeItem("picture");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    sessionStorage.removeItem("token");
    window.location.reload(false);
  };
  // function to allow user in if signed in
  async function getAuth() {
    let res = await fetch(authURL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        cookies: sessionStorage.getItem("token"),
        id: localStorage.getItem("loginID"),
      }),
    });
    let auth = await res.json();
    if (auth.data == false) {
      logout();
      window.location.href = "signin";
    }
  }
  getAuth();
  /*to HERE, got it!!!*/
  var array = [];
  const [post, setPost] = React.useState(null);
  const baseURL = new URL(
    url +
      "/recipes/" +
      encodeURIComponent(localStorage.getItem("loginID"))
        .replace("%22", "")
        .replace("%22", "")
  );
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      console.log(response.data);
    });
  }, []);
  if (!post) return null;
  return (
    <div>
      <h1>Recipe Page</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Ingredients</th>
          <th>Preparation</th>
          <th>Nutrition</th>
        </tr>
        {post.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.ingredients}</td>
              <td>{val.preparation}</td>
              <td>{val.nutrition}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

// good resource for making tables in ajax
// https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/

export default Recipe;

