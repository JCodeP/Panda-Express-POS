import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMenu } from "../MenuContext";

import { useOrder } from "./CashierOrderContext";

import "./CashierHome.css";

/**
 * @author Kade Lieder 
 * 
 * The landing page for the cashier. Allows the cashier to add combos, appetizers, and drinks to the order
 */
function CashierHome() {

    const navigate = useNavigate();
    const { menuItems, addMenuItem, removeMenuItem } = useMenu();
    const { order, setOrder } = useOrder();
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Adds to order list
    const addItemToOrder = (item) => {
        setOrder((prevOrder) => [...prevOrder, item]);
    };

    // Deletes highlighted item from order
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

    // Organizes items by category
    const itemsByCategory = menuItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

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
            <div className="buttons">
                {Object.entries(itemsByCategory).map(([category, items]) => (
                    <div key={category} className="button-container">
                        {items.map((item) => (
                            <button key={item.id} onClick={() => addItemToOrder(item)}>
                                {item.name}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CashierHome;