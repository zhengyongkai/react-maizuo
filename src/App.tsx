import { Provider } from "react-redux";
import store from "@/store/index";
import routes from "@/router";
import "./App.css";
import RouterPage from "@/pages/test/routerPage";
import { HashRouter, useRoutes } from "react-router-dom";

import { applyMiddleware, createStore } from "redux";

function App() {
  // return <Provider store={store}>{useRoutes(routes)}</Provider>;
  return (
    <Provider store={store}>
      <HashRouter>
        <RouterPage />
      </HashRouter>
    </Provider>
  );
}

export default App;
