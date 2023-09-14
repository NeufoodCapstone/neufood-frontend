import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import CreateIcon from "@material-ui/icons/Create";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

/*
 * Hey Yiqun
 * All you have to do is change the recipeList variable to the JSON object from the backend
 * Right now I have dummy variables in, don't change anything that is not the recipeList
 */

export default function Ingredients() {
  //defining a state named rows
  //which we can update by calling on setRows function
  //const[rows, setRows] = useState([{id: 1, ingredientname: "", price: "", category: ""},]);
  const [post, setPost] = useState([
    { id: 1, name: "", price: "", category: "" },
  ]);
  // States for ingredients
  //const [name, setName] = useState('');
  //const [price, setPrice] = useState('');
  //const [category, setCategory] = useState('');

  // States for checking the errors
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState(true);

  //function for adding new row object
  const handleAdd = async (googleData) => {
    setPost([
      ...post,
      {
        name: "",
        price: "",
        category: "",
      },
    ]);
    setEdit(true);
  };

  //function to handle edit
  const handleEdit = (i) => {
    setEdit(!isEdit);
  };

  //function to handle save
  const handleSave = async () => {
    setEdit(!isEdit);
    setPost(post);
    ////
    ///
    const user = localStorage.getItem("loginID");
    console.log("saved : ", post[post.length - 1].name);
    console.log("apiiiiiiiiiiiiiiiiiiiiiiiiiii");
    console.log(
      "http://localhost:8080/ingredients/" +
        post[post.length - 1].name +
        "/" +
        post[post.length - 1].price +
        "/" +
        post[post.length - 1].category +
        "/" +
        encodeURIComponent(user).replace("%22", "").replace("%22", "")
    );

    const res = await fetch(
      "http://localhost:8080/ingredients/b/b/b/107998420216333899280",
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
    setError(true);
    setOpen(true);
  };

  //listen for changes
  const handleInputChange = (e, index) => {
    setError(false);
    const { name, value } = e.target;
    const list = [...post];
    list[index][name] = value;
    setPost(list);
  };

  //showing delete confirmation to users
  const handleSubmit = () => {
    setSubmitted(true);
  };

  //handles the case of delete where users click yes to delete row
  const handleRemoveClick = (i) => {
    const list = [...post];
    console.log(list[i]);
    list.splice(i, 1);
    setPost(list);
    setSubmitted(false);
  };

  //handle the case of delete where users click no
  const handleNo = () => {
    setSubmitted(false);
  };
  // authenticate user first
  const authURL = "http://localhost:8080/auth";

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
  var array = [];

  const user = localStorage.getItem("loginID");
  console.log(user);
  const baseURL =
    "http://localhost:8080/" +
    encodeURIComponent(user).replace("%22", "").replace("%22", "") +
    "/ingredients";
  console.log(baseURL);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      console.log(response.data);
    });
  }, []);

  if (!post) return null;
  return (
    <div className="ingredients">
      <h1>Ingredients Page</h1>
      <table>
        <Box margin={1}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {isEdit ? (
                <div>
                  <Button onClick={handleAdd}>
                    <AddBoxIcon onClick={handleAdd} />
                    Add Ingredient
                  </Button>
                  {post.length !== 0 && (
                    <div>
                      {Error ? (
                        <Button error align="right" onClick={handleSave}>
                          <DoneIcon />
                          SAVE for add
                        </Button>
                      ) : (
                        <Button align="right" onClick={handleSave}>
                          <DoneIcon />
                          SAVE
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Button onClick={handleAdd}>
                    <AddBoxIcon onClick={handleAdd} />
                    ADD
                  </Button>
                  <Button align="right" onClick={handleEdit}>
                    <CreateIcon />
                    EDIT
                  </Button>
                </div>
              )}
            </div>
          </div>
          <TableRow align="center"> </TableRow>
          <tr>
            <th>Name</th>
            <th>price</th>
            <th>category</th>
          </tr>
          {post.map((row, i) => {
            return (
              <div>
                <TableRow>
                  {isEdit ? (
                    <div>
                      <TableCell padding="none">
                        <input
                          value={row.name}
                          name="name"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                      <TableCell padding="none">
                        <input
                          value={row.price}
                          name="price"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                      <TableCell padding="none">
                        <input
                          value={row.category}
                          name="category"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </TableCell>
                    </div>
                  ) : (
                    <div>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.price}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.category}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></TableCell>
                    </div>
                  )}
                  {isEdit ? (
                    <Button className="mr10" onClick={handleSubmit}>
                      <ClearIcon />
                    </Button>
                  ) : (
                    <Button className="mr10" onClick={handleSubmit}>
                      <DeleteOutlineIcon />
                    </Button>
                  )}
                  {submitted && (
                    <div>
                      <Dialog
                        open={submitted}
                        onClose={handleNo}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Confirm Delete"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure to delete
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => handleRemoveClick(row)}
                            color="primary"
                            autoFocus
                          >
                            Yes
                          </Button>
                          <Button onClick={handleNo} color="primary" autoFocus>
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  )}
                </TableRow>
              </div>
            );
          })}
        </Box>
      </table>
    </div>
  );
}
