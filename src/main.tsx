import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// import socket from 'kevins-websocket';

import KeepAlive, { AliveScope } from "react-activation";

import "virtual:svg-icons-register";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <HashRouter>
      <AliveScope>
        <App />
      </AliveScope>
    </HashRouter>
  </Provider>
);
