import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { AliveScope } from "react-activation";

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
