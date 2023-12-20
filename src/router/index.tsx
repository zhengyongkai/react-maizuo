/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content:
 */
import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
// const Todo = lazy(() => import(".@/pages/test/pages/todo/index"));
// const Index = lazy(() => import(".@/pages/test/pages/index"));
// const Test1 = lazy(() => import(".@/pages/test/pages/test/components"));
// const Test2 = lazy(() => import(".@/pages/test/pages/test/01state"));
// const Test3 = lazy(() => import(".@/pages/test/pages/test/02lifecycle"));
// const Test4 = lazy(() => import(".@/pages/test/pages/test/forwardRef"));
// const Test5 = lazy(() => import(".@/pages/test/pages/test/03Context"));
// const Test6 = lazy(() => import(".@/pages/test/pages/test/04classContent"));
// const KButton = lazy(() => import(".@/pages/test/pages/main/Button"));
// const Page = lazy(() => import(".@/pages/test/pages/index"));
// const UseCallbackPage = lazy(() => import(".@/pages/test/pages/test/useCallbackPage"));
// const LifeCycle = lazy(() => import(".@/pages/test/pages/test/02lifecycle1"));
// const LifeCycle1 = lazy(
//   () => import(".@/pages/test/pages/test/02lifecycle-getSnapshotBeforeUpdate")
// );
// const Reducer = lazy(() => import(".@/pages/test/pages/test/03Reducer"));

// const ReduxComponents = lazy(() => import(".@/pages/test/pages/test/07redux"));
import RouterPage1 from "@/pages/test/components/routerPage1";
import Login from "@/pages/test/components/login";
import Location from "@/pages/test/components/location";
import HomePage from "@/pages/test/components/home";
import NewsPage from "@/pages/test/components/news";
import MyPage from "@/pages/test/components/my";
import ComingSoon from "@/pages/test/components/comingSoon";
import NowPlaying from "@/pages/test/components/nowPlaying";
import FilmPage from "@/pages/test/components/films";
import CinemasPage from "@/pages/test/components/cinemas";
import RouterLocation from "@/components/Route/routeFc";
import KeepAlive from "react-activation";
import Map from "@/pages/test/components/map";
import SeatPage from "@/pages/test/seats";
import RatePage from "@/pages/test/rate";
import OrderPage from "@/pages/test/components/order";

import CinemasInfo from "@/pages/test//schedule";
import { Navigate } from "react-router-dom";

export interface RouteObjectImf {
  path: string;
  element: React.ReactNode;
  meta?: {
    login?: boolean;
    keepAlive?: boolean;
    locate?: boolean;
  };
  children?: RouteObjectImf[];
}

const Router: RouteObjectImf[] = [
  {
    path: "*",
    element: <Navigate to={"/name/home/nowPlaying"}></Navigate>,
  },
  {
    path: "/location",
    element: <Location />,
  },
  {
    path: "/name/",
    element: <RouterPage1 />,
    children: [
      {
        path: "/name/home",
        element: <HomePage />,
        children: [
          {
            path: "/name/home/nowPlaying",
            element: <NowPlaying />,
            meta: {
              keepAlive: true,
            },
          },
          {
            path: "/name/home/comingSoon",
            element: <ComingSoon />,
            meta: {
              keepAlive: true,
            },
          },
        ],
      },
      {
        path: "news",
        element: <NewsPage />,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "my",
        element: <MyPage />,
        meta: {
          keepAlive: true,
        },
      },
    ],
  },

  {
    path: "/films/:id",
    element: <FilmPage />,
  },
  {
    path: "/films/cinemas/:id",
    element: <CinemasPage />,
    meta: {
      locate: true,
    },
  },
  {
    path: "/films/chinemasInfo/:cinemaId/:filmId/:showDate",
    element: <CinemasInfo />,
    meta: {
      locate: true,
    },
  },
  {
    path: "map/:lng/:lat",
    element: <Map />,
  },
  {
    path: "seat/:id/:showDate",
    element: <SeatPage></SeatPage>,
  },
  {
    path: "rate/:filmId",

    element: <RatePage />,
  },
  {
    path: "order",
    element: <OrderPage />,
  },
];

export default Router;
