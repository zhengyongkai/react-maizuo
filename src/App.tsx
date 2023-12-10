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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocationAsync,
  getLocationListsAsyc,
} from "@/store/common/location";
// import CinemasInfo from "./schedule";
import RouterLocation from "@/components/Route/routeFc";
import AuthHoc from "@/components/Auth/authFc";
// import Map from "./components/map";
import { getUserDataThunk } from "@/store/common/user";
import { user, userState } from "@/pages/types/user";

// import SeatPage from "./seats";
// import Seat from "./components/seat";




function App() {
  const token = useSelector<userState, string>((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fn = async () => {
      // do something
      await dispatch(getLocationAsync());
      await dispatch(getLocationListsAsyc());
    };
    fn();
  }, []);

  useEffect(() => {
    const fn = async () => {
      await dispatch(getUserDataThunk());
    };
    if (token) {
      fn();
    }
  }, [token]);
  // return <Provider store={store}>{useRoutes(routes)}</Provider>;
  return <>{useRoutes(routes)}</>


}

export default App;
