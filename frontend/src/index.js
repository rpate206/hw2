import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RequestProvider } from "react-request-hook";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Had to comment out StrictMode to get the App from clicking the checkbox twice even when I clicked it once
  //<React.StrictMode>
  <RequestProvider value={axiosInstance}>
    <App />
  </RequestProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
