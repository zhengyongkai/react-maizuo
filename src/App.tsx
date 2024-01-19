/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { Suspense, createContext, useEffect, useState } from "react";

import { useRoutes, RouteObject, useNavigate } from "react-router-dom";
import Router, { RouteObjectInf } from "./router";
import KeepAlive from "react-activation";
import WithLocation from "./components/Hoc/WithLocation";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "./types/user";

import {
  getLocationAsync,
  getLocationListsAsyc,
} from "@/store/common/location";
import { getUserCouponThunk, getUserDataThunk } from "@/store/common/user";
import WithAuth from "@/components/Hoc/WithAuth";
import Loading from "./components/Common/PartLoading";
import socketIo from "./utils/socket";

//懒加载处理
const syncRouter = (routes: RouteObjectInf[]): RouteObjectInf[] => {
  let mRouteTable: RouteObjectInf[] = [];
  routes.forEach((route) => {
    mRouteTable.push({
      path: route.path,
      element: <RequireAuth route={route}>{route.element}</RequireAuth>,
      children: route.children && syncRouter(route.children),
    });
  });
  return mRouteTable;
};
//路由拦截
const RequireAuth = (props: { route: RouteObjectInf; children: any }) => {
  let router = props.route;
  let children = props.children;
  children = (
    <KeepAlive id={props.route.path} when={false}>
      <Suspense>{props.children}</Suspense>
    </KeepAlive>
  );

  if (router.meta?.locate) {
    children = <WithLocation>{children}</WithLocation>;
  }
  if (router.meta?.login) {
    children = <WithAuth>{children}</WithAuth>;
  }
  return children;
};

export default () => {
  const token = useSelector<userState, string>((state) => state.user.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fn = async () => {
      setLoading(true);
      await dispatch(getLocationListsAsyc());
      setLoading(false);
      await dispatch(getLocationAsync());
    };
    fn();
  }, []);

  useEffect(() => {
    const fn = async () => {
      await dispatch(getUserDataThunk());
      await dispatch(getUserCouponThunk());
    };
    if (token) {
      fn();
      socketIo.connect({
        token,
      });
    }
  }, [token]);

  return <Loading loading={loading}>{useRoutes(syncRouter(Router))}</Loading>;
};
