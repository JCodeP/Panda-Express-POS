import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useOrder } from "./CashierOrderContext";

function CashierComboScreen() {
    const { order, setOrder } = useOrder();
    const { navigate } = useNavigate();

    return (
        <div className="combo-screen">
            <h1>Balls</h1>
        </div>
    )
}

export default CashierComboScreen;