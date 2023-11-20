import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// import socket from 'kevins-websocket';

import "virtual:svg-icons-register";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />

  //   <React.StrictMode>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </React.StrictMode>
);
