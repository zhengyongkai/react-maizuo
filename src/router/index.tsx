import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
const Todo = lazy(() => import("../pages/todo/index"));
const Index = lazy(() => import("../pages/index"));
const Test1 = lazy(() => import("../pages/test/components"));
const Test2 = lazy(() => import("../pages/test/01state"));
const Test3 = lazy(() => import("../pages/test/02lifecycle"));
const Test4 = lazy(() => import("../pages/test/forwardRef"));
const Test5 = lazy(() => import("../pages/test/03Context"));
const Test6 = lazy(() => import("../pages/test/04classContent"));
const KButton = lazy(() => import("../pages/main/Button"));
const Page = lazy(() => import("../pages/index"));
const UseCallbackPage = lazy(() => import("../pages/test/useCallbackPage"));
const LifeCycle = lazy(() => import("../pages/test/02lifecycle1"));
const LifeCycle1 = lazy(
  () => import("../pages/test/02lifecycle-getSnapshotBeforeUpdate")
);
const Reducer = lazy(() => import("../pages/test/03Reducer"));

const ReduxComponents = lazy(() => import("../pages/test/07redux"));

const Router: RouteObject[] = [
  {
    path: "/",
    element: <ReduxComponents />,
    // children: [
    //   {
    //     path: "/todo",
    //     element: <Todo />,
    //   },
    // ],
  },
];

export default Router;
