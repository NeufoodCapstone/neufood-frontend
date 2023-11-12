import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { config } from "../Constants";
import axios from "axios";

var url = config.url.API_HOME;

const theme = createTheme();

export default function SignUp() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(false);

  const [currentError, setCurrentError] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassMatch, setErrorPassMatch] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorEmail(false);
    setErrorFirstName(false);
    setErrorLastName(false);
    setErrorPassMatch(false);
    setErrorPassword(false);
    setCurrentError("");
    if (password !== confirmPassword) {
      setErrorPassMatch(true);
      return setCurrentError("Passwords do not match");
    }
    let response = await fetch(url + "/authentication/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();

    if (result.error) {
      switch (result.error) {
        case "duplicate email":
          setErrorEmail(true);
          setCurrentError("This email address is already in use");
          break;
        case "invalid password":
          setErrorPassword(true);
          setCurrentError(
            "Please enter a password that is at least 8 characters, contains an uppercase letter, and a number"
          );
          break;
        case "invalid firstname":
          setErrorFirstName(true);
          setCurrentError("Please enter a valid first name");
          break;
        case "invalid lastname":
          setErrorLastName(true);
          setCurrentError("Please enter a valid last name");
          break;
        case "invalid email":
          setErrorEmail(true);
          setCurrentError("Please enter a valid email address");
          break;
        default:
          setCurrentError("Internal server error, please try again later");
          break;
      }
    } else {
      localStorage.setItem("loginData", JSON.stringify(result));
      localStorage.setItem("picture", JSON.stringify(result.picture));
      sessionStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("loginID", JSON.stringify(result.id));
      window.location.href = "/signin";
    }
  };

  return (
    <div
      style={{
        "background-color": "rgb(245, 239, 237)",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {currentError && (
              <Typography component="p" variant="p" color="error">
                {currentError}
              </Typography>
            )}
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    sx={errorFirstName && { input: { color: "red" } }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={errorLastName && { input: { color: "red" } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={errorEmail && { input: { color: "red" } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={
                      errorPassword | errorPassMatch && {
                        input: { color: "red" },
                      }
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={
                      errorPassword | errorPassMatch && {
                        input: { color: "red" },
                      }
                    }
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
