import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useOrder } from "./CashierOrderContext";

import "./CashierHome.css";

function CashierComboScreen() {
    const { order, setOrder } = useOrder();
    const { navigate } = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(null);

    const addItemToOrder = (item) => {
        setOrder((prevOrder) => [...prevOrder, item]);

        if (item.category === "Combos") {
            navigate("/cashiers/combos");
        }
    };

    const deleteSelectedItem = () => {
        if (selectedIndex === null) {
            return;
        }

        setOrder((prevOrder) => prevOrder.filter((_, index) => index !== selectedIndex));
        setSelectedIndex(null);
    };

    // Duplicates highlighted item in order
    const duplicateSelectedItem = () => {
        if (selectedIndex === null) {
            return;
        }

        addItemToOrder(order[selectedIndex]);

        setSelectedIndex(null);
    }

    const clearOrder = () => {
        setOrder([]);
    };

    // Sums price of items in order
    const getTotalPrice = useMemo(() => {
        return order.reduce((total, item) => total + item.price, 0).toFixed(2);
    }, [order]);

    // Navigates to submit screen
    const submitScreen = () => {
        navigate("/cashiers/submit", { state: { order } });
    }

    return (
        <div className="cashier-home">
            <div className="order-list-container">
                <h2>Current Order - Click to Select</h2>
                <ul className="order-list">
                    {order.map((item, index) => (
                        <li
                            key={index}
                            className={index === selectedIndex ? "selected" : ""}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {item.name} - ${item.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <div className="adjust-buttons">
                    <button onClick={deleteSelectedItem}>Delete</button>
                    <button onClick={duplicateSelectedItem}>Duplicate</button>
                    <button className="cancel-button" onClick={clearOrder}>Cancel</button>
                </div>
                <div className="pay-button">
                    <button onClick={submitScreen}>Pay: ${getTotalPrice}</button>
                </div>
            </div>
        </div>
    )
}

export default CashierComboScreen;