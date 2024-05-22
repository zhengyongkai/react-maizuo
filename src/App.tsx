/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { Suspense, useEffect, useState } from "react";

import { useRoutes } from "react-router-dom";
import Router, { RouteObjectInf } from "./router";
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
import { localeState } from "./types/location";
import { getCinemasByCityId } from "./api/movice";
import { setCinemaList } from "./store/common/cinema";

/**
 * @description: 生成子路由，加入 RequireAuth 组件进行鉴权
 * @param {RouteObjectInf} routes
 * @return {RouteObjectInf[]}
 */
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

/**
 * @description:  生成鉴权或者需要地址得中间件
 * @param {object} props
 * @return {React.ReactNode}
 */
const RequireAuth = (props: {
  route: RouteObjectInf;
  children: React.ReactNode;
}) => {
  let router = props.route;
  let children = props.children;
  children = <Suspense>{props.children}</Suspense>;

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
  const cityId = useSelector<localeState, number>(
    (state) => state.location.locale.cityId,
  );
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
    /**
     * @description: 获取用户信息 获取用户优惠卷 链接Socket
     * @return {*}
     */
    const getUserDataCouponAndSocketConnect = async () => {
      await dispatch(getUserDataThunk());
      await dispatch(getUserCouponThunk());
    };
    if (token) {
      getUserDataCouponAndSocketConnect();
      socketIo.connect({
        token,
      });
    }
  }, [token]);

  useEffect(() => {
    /**
     * @description: 通过 CityId 获取当地电影院
     * @return {*}
     */
    async function getCinemasList() {
      const {
        data: { cinemas },
      } = await getCinemasByCityId({
        cityId: cityId,
      });
      dispatch(setCinemaList(cinemas));
    }
    if (cityId) {
      getCinemasList();
    }
  }, [cityId]);

  return <Loading loading={loading}>{useRoutes(syncRouter(Router))}</Loading>;
};
