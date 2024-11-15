import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMenu } from "../MenuContext";
import { useOrder } from "./CashierOrderContext";

import "./CashierHome.css";

function CashierComboScreen() {
    const { order, setOrder } = useOrder();
    const { entrees, comboOptions, sides } = useMenu();
    const [selectedIndex, setSelectedIndex] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const { comboId } = location.state || {};
    const comboIndex = order.length - 1;
    const combo = order[comboIndex];
    const maxEntrees = comboOptions.find(option => option.id === comboId)?.maxEntrees || 0;


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

    const goBack = () => {
        if (combo && !combo.side) {
            alert("Please select a side.");
            return;
        }

        if (combo && combo.entrees.length !== maxEntrees) {
            alert(`Please select exactly ${maxEntrees} entree(s).`);
            return;
        }

        navigate("/cashiers/home", { state: { order } });
    }

    if (combo && !combo.entrees) {
        combo.entrees = [];
    }

    const addSideToCombo = (side) => {
        if (combo) {
            const updatedCombo = {
                ...combo,
                side,
            };
            const newOrder = [...order];
            newOrder[comboIndex] = updatedCombo;
            setOrder(newOrder);
        }
    };

    const addEntreeToCombo = (entree) => {
        if (combo && combo.entrees.length < maxEntrees) {
            const updatedCombo = {
                ...combo,
                entrees: [...combo.entrees, entree],
            };
            const newOrder = [...order];
            newOrder[comboIndex] = updatedCombo;
            setOrder(newOrder);
        } else {
            alert(`Cannot add more than ${maxEntrees} entrees.`);
        }
    };

    const resetChoices = () => {
        if (combo) {
            const resetCombo = {
                ...combo,
                side: null,
                entrees: [],
            };
            const newOrder = [...order];
            newOrder[comboIndex] = resetCombo;
            setOrder(newOrder);
        }
    };

    const removeFromOrder = () => {
        setOrder((prevOrder) => prevOrder.filter((item) => item.id !== comboId));
        navigate("/cashiers/home", { state: { order } });
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
                                    )))}
                            </ul>
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
                <div className="button-container">
                    {sides.map((side) => (
                        <button key={side.id} onClick={() => addSideToCombo(side)}>
                            {side.name}
                        </button>
                    ))}
                </div>
                <div className="button-container">
                    {entrees.map((entree) => (
                        <button key={entree.id} onClick={() => addEntreeToCombo(entree)}>
                            {entree.name}
                        </button>
                    ))}
                </div>
                <div className="button-container">
                    <button onClick={goBack}>Done</button>
                    <button onClick={resetChoices}>Reset Choices</button>
                    <button onClick={removeFromOrder}>Remove From Order</button>
                </div>
            </div>
        </div>
    )
}

export default CashierComboScreen;