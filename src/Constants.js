import { env } from "./env";
const prod = {
  url: {
    API_URL: "https://neufood.herokuapp.com",
    API_HOME: "https://neufood.herokuapp.com",
  },
};
const dev = {
  url: {
    // change the port number to match whats in route.js
    API_URL: "http://0.0.0.0:8080",
    API_HOME: "http://localhost:8080",
  },
};
export const config = env.REACT_APP_NODE_ENV === "development" ? dev : dev;
