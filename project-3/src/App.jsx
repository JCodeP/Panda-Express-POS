import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Homepage/Header.jsx";
import SiteNavBar from "./Homepage/SiteNavBar.jsx";
import CashierHome from "./Cashiers/CashierHome.jsx";
import CashierSubmitScreen from "./Cashiers/CashierSubmitScreen.jsx";
import ManagerHome from "./Managers/ManagerHome.jsx";
import CustomerHome from "./Customers/CustomerHome.jsx";
import MenuBoard from "./MenuBoard/MenuBoard.jsx";
import OrderSize from "./MenuBoard/OrderSize.jsx";
import Sides from "./MenuBoard/Sides.jsx";
import Entrees from "./MenuBoard/Entrees.jsx";
import ExtraItems from "./MenuBoard/ExtraItems.jsx";

import { MenuProvider } from "./MenuContext.jsx";
import { CashierOrderProvider } from "./Cashiers/CashierOrderContext.jsx";

function App() {
  return (
    <MenuProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <SiteNavBar />
            </>
          }
          />
          <Route path="/managers/*" element={<ManagerHome />} />
          <Route path="/cashiers/*" element={
            <CashierOrderProvider>
              <Routes>
                <Route path="" element={<CashierHome />} />
                <Route path="submit" element={<CashierSubmitScreen />} />
              </Routes>
            </CashierOrderProvider>
          } />
          <Route path="/customers/*" element={<CustomerHome />} />
          <Route path="/menu/*" element={<MenuBoard />} />
          <Route path="/menu/order-size" element={<OrderSize />} />
          <Route path="/menu/sides" element={<Sides />} />
          <Route path="/menu/entrees" element={<Entrees />} />
          <Route path="/menu/extra-items" element={<ExtraItems />} />
        </Routes>
      </Router>
    </MenuProvider>
  );
}

export default App
