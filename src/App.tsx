/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { Suspense, useEffect } from "react";

import { useRoutes, RouteObject, useNavigate } from "react-router-dom";
import Router, { RouteObjectImf } from "./router";
import KeepAlive from "react-activation";
import RouterLocation from "./components/Route/routeFc";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "./pages/types/user";
import {
  getLocationAsync,
  getLocationListsAsyc,
} from "./store/common/location";
import { getUserDataThunk } from "./store/common/user";
import AuthHoc from "./components/Auth/authFc";

//懒加载处理
const syncRouter = (routes: RouteObjectImf[]): RouteObjectImf[] => {
  let mRouteTable: RouteObjectImf[] = [];
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
const RequireAuth = (props: { route: RouteObjectImf; children: any }) => {
  let router = props.route;
  let children = props.children;
  children = (
    <KeepAlive id={props.route.path} when={false}>
      {props.children}
    </KeepAlive>
  );

  if (router.meta?.locate) {
    children = <RouterLocation>{children}</RouterLocation>;
  }
  console.log(router.meta);
  if (router.meta?.login) {
    children = <AuthHoc>{children}</AuthHoc>;
  }
  return children;
};

export default () => {
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

  return useRoutes(syncRouter(Router));
}; //暴露为一个函数
