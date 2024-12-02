import React, { useState, useMemo } from 'react';
import { Routes, useNavigate } from 'react-router-dom';

import { useMenu } from "../MenuContext";
import { useOrder } from "./CashierOrderContext";

import "./CashierHome.css";

/**
 * @author Kade Lieder 
 * 
 * The landing page for the cashier. Allows the cashier to add combos, appetizers, and drinks to the order
 */
function CashierHome({ priceModifier }) {

    const navigate = useNavigate();
    const { menuItems, addMenuItem, removeMenuItem } = useMenu();
    const { order, setOrder } = useOrder();
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Adds to order list
    const addItemToOrder = (item) => {
        if (item.category === "Combos") {
            addComboToOrder(item);
        } else {
            setOrder((prevOrder) => [...prevOrder, item]);
        }
    };

    // Deletes item when (x) button clicked
    const deleteItem = (index) => {
        setOrder((prevOrder) => prevOrder.filter((_, i) => i !== index));
        if (index === selectedIndex) {
            setSelectedIndex(null);
        }
    };

    // Duplicates highlighted item in order
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

    // Clears order list
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
        const total = order.reduce((total, item) => total + item.price, 0);

        return (total * (priceModifier || 1)).toFixed(2);
    }, [order, priceModifier]);

    // Navigates to submit screen
    const submitScreen = () => {
        navigate("/cashiers/submit", { state: { order } });
    }

    // Adds combo (bowl, plate, etc) and switches to combo screen
    const addComboToOrder = (combo) => {
        const comboWithEntrees = { ...combo, side: null, entrees: [] };
        setOrder((prevOrder) => [...prevOrder, comboWithEntrees])

        navigate("/cashiers/combos", { state: { order, comboId: combo.id } });
    };

    // Returns header at top of order list
    const getDiscountMessage = (priceModifier) => {
        if (priceModifier === 0.9) {
            return "Current Order - 10% discount";
        } else if (priceModifier === 0.95) {
            return "Current Order - 5% discount";
        } else {
            return "Current Order - No discount";
        }
    };

    return (
        <div className="cashier-home">
            <div className="order-list-container">
                <h2>{getDiscountMessage(priceModifier)}</h2>
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
                            {item.name} - ${item.price.toFixed(2)}
                            <ul>
                                {item.side && (
                                    <li>
                                        {item.side.name}
                                    </li>
                                )}
                                {item.entrees && item.entrees.length > 0 && (
                                    item.entrees.map((entree, i) => (
                                        <li key={i}>
                                            {entree.name}
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
                <div className="back-button-container">
                    <button onClick={() => navigate('/', { replace: true })}>Back</button>
                </div>
            </div>

        </div>
    );
}

export default CashierHome;