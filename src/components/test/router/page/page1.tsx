import { PureComponent, ReactNode } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Page2 from './page2';
import Navbar from './Navbar';
import Page3 from './page3';

export default class Page1 extends PureComponent {
  render(): ReactNode {
    return (
      <>
        dasd
        <NavLink to="/home/page2">点击我</NavLink>
   dfasd
        <Routes>
          <Route path="page2" element={<Page2></Page2>}></Route>
          <Route path="page3" element={<Page3></Page3>}></Route>
        </Routes>
      </>
    );
  }
}
