import { Outlet } from "react-router-dom";

import Tabbar from "@/components/Layout/tabBar";

export default function routerPage() {
  return (
    <>
      <Outlet></Outlet>
      <Tabbar></Tabbar>
    </>
  );
}
