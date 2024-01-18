import { Outlet } from "react-router-dom";

import Tabbar from "@/components/Layout/TabBar";
import { SwitchTransition, CSSTransition } from "react-transition-group";

export default function routerPage() {
  return (
    <>
      <Outlet></Outlet>

      <Tabbar></Tabbar>
    </>
  );
}
