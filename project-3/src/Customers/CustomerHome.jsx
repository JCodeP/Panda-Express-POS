import React, { useState } from 'react';
import "./CustomerHome.css";
import {Routes, Route, Outlet, Navigate} from "react-router-dom";
import Welcome from "./Welcome.jsx";
import Menu from "./Menu/Menu.jsx";
import Payment from "./Payment.jsx";
import OrderComplete from "./OrderComplete.jsx";

function CustomerHome() {
    const [language, setLanguage] = useState("en");

    const changeLanguage = () => {
        if(language === "en") {
            setLanguage("es");
        }
        else {
            setLanguage("en");
        }
    }

    return (
        <>
            <Routes>
                <Route index element={<Navigate to="welcome" replace />} />
                <Route path = "welcome" element = {<Welcome language={language} changeLanguage={changeLanguage} />} />
                <Route path = "menu" element = {<Menu language={language} changeLanguage={changeLanguage} />} />
                <Route path = "payment" element = {<Payment language={language} changeLanguage={changeLanguage} />} />
                <Route path = "orderComplete" element = {<OrderComplete language={language} changeLanguage={changeLanguage} />} />
            </Routes>

            <Outlet />
        </>
        
    );
}

export default CustomerHome;