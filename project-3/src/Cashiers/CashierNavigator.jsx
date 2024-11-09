import React from 'react';
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import CashierHome from "./CashierHome";
import CashierSubmitScreen from "./CashierSubmitScreen";
import CashierComboScreen from "./CashierComboScreen";

function CashierNavigator() {
    return (
        <>
            <Routes>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<CashierHome />} />
                <Route path="combos" element={<CashierComboScreen />} />
                <Route path="submit" element={<CashierSubmitScreen />} />
            </Routes>

            <Outlet />
        </>
    )
}

export default CashierNavigator;