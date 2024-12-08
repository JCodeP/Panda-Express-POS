// src/Cashiers/PayPage.jsx
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useOrder } from "./CashierOrderContext";

import "./CashierHome.css";

/**
 * @author Kade Lieder
 * 
 * Payment screen wherein the cashier can view the current order and select a payment method 
 */
function CashierSubmitScreen({ priceModifier }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { order, setOrder } = useOrder();
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Calculates the total price of the order
    const getTotalPrice = useMemo(() => {
        const total = order.reduce((total, item) => total + item.price, 0);

        return (total * (priceModifier || 1)).toFixed(2);
    }, [order, priceModifier]);

    // Deletes item when (x) button clicked
    const deleteItem = (index) => {
        setOrder((prevOrder) => prevOrder.filter((_, i) => i !== index));
        if (index === selectedIndex) {
            setSelectedIndex(null);
        }
    };

    // Adds an item to the order; used by duplicateSelectedItem()
    const addItemToOrder = (item) => {
        if (item.category === "Combos") {
            addComboToOrder(item);
        } else {
            setOrder((prevOrder) => [...prevOrder, item]);
        }
    };

    // Duplicates an item highlighted
    const duplicateSelectedItem = () => {
        if (selectedIndex === null) {
            return;
        }

        if (order[selectedIndex].category === "Combos") {
            const combo = order[selectedIndex];
            const updatedCombo = {
                ...combo,
                entrees: combo.entrees.map(entree => ({ ...entree })),
            };
            setOrder((prevOrder) => [...prevOrder, updatedCombo]);
        }
        else {
            addItemToOrder(order[selectedIndex]);
        }

        setSelectedIndex(null);
    }

    // Clears the order
    const clearOrder = () => {
        setOrder([]);
    };

    // Exits the payment screen to adjust order
    const goBack = () => {
        navigate("/cashiers/home", { state: order });
    }

    return (
        <div className="cashier-home">
            <div className="order-list-container">
                <h2>Current Order - ${getTotalPrice}</h2>
                <ul className="order-list">
                    {order.map((item, index) => (
                        <li
                            key={index}
                            className={index === selectedIndex ? "selected" : ""}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <button
                                className="delete-button"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents the parent `li`'s onClick from firing
                                    deleteItem(index);
                                }}
                            >X</button>
                            {item.item_name} - ${item.price.toFixed(2)}
                            <ul>
                                {item.side && (
                                    <li>
                                        {item.side.item_name}
                                    </li>
                                )}
                                {item.entrees && item.entrees.length > 0 && (
                                    item.entrees.map((entree, i) => (
                                        <li key={i}>
                                            {entree.item_name}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </li>
                    ))}
                </ul>
                <div className="adjust-buttons">
                    <button onClick={duplicateSelectedItem}>Duplicate</button>
                    <button className="cancel-button" onClick={clearOrder}>Cancel</button>
                </div>
                <div className="pay-button">
                    <button onClick={goBack}>Go Back</button>
                </div>
            </div>
            <div className="pay-buttons">
                <div className="pay-button-container">
                    <button>Credit / Debit Card</button>
                </div>
                <div className="pay-button-container">
                    <button>Cash</button>
                </div>
                <div className="pay-button-container">
                    <button>Gift Card</button>
                </div>
            </div>
        </div>
    );
}

export default CashierSubmitScreen;