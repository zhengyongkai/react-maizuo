import { Outlet } from "react-router-dom";

import Tabbar from "@/components/Layout/TabBar";

export default function RouterPage() {
  return (
    <>
      <Outlet></Outlet>
      <Tabbar></Tabbar>
    </>
  );
}
