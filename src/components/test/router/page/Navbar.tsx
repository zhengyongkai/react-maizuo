import { Route, Routes } from "react-router-dom";
import Page2 from "./page2";
import Page3 from "./page3";
export default function Navbar(){
  return <>
    <Routes>
      <Route path="page2" element={<Page2></Page2>}></Route>
      <Route path="page3" element={<Page3></Page3>}></Route>
    </Routes>
  </>
}