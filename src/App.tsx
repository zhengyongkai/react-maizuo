/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { Provider } from "react-redux";
import store from "@/store/index";
import routes from "@/router";
import "./App.css";
import RouterPage from "@/pages/test/routerPage";
import { HashRouter, useRoutes, Routes, Route, Navigate } from "react-router-dom";
// import { Routes, Route, Navigate } from "react-router-dom";
import { AliveScope } from "react-activation"; //引入，需要结合使用

import { applyMiddleware, createStore } from "redux";

function App() {
  // return <Provider store={store}>{useRoutes(routes)}</Provider>;

  console.log(routes);
  return (
    <Provider store={store}>
      <AliveScope>
        {useRoutes(routes)}
      </AliveScope>
    </Provider>

  );
}

export default App;
