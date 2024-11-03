import React from 'react';
import "./CustomerHome.css";
import {Routes, Route, Outlet, Navigate} from "react-router-dom";
import Welcome from "./Welcome.jsx";
import Menu from "./Menu/Menu.jsx";
import OrderComplete from "./OrderComplete.jsx";

function CustomerHome() {
    return (
        <>
            <Routes>
                <Route index element={<Navigate to="welcome" replace />} />

                <Route path = "welcome" element = {<Welcome />} />
                <Route path = "menu" element = {<Menu />} />
                <Route path = "orderComplete" element = {<OrderComplete />} />
            </Routes>

            <Outlet />
        </>
        
    );
}

export default CustomerHome;