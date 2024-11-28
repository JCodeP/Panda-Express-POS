import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMenu } from "../MenuContext";
import { useOrder } from "./CashierOrderContext";

import "./CashierHome.css";

/**
 * @author Kade Lieder
 * 
 * Combo screen wherein cashier can select entrees and sides for a combo
 */
function CashierComboScreen({ priceModifier }) {
    const { order, setOrder } = useOrder();
    const { entrees, comboOptions, sides } = useMenu();
    const [selectedIndex, setSelectedIndex] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const { comboId } = location.state || {};
    const comboIndex = order.length - 1;
    const combo = order[comboIndex];
    const maxEntrees = comboOptions.find(option => option.id === comboId)?.maxEntrees || 0;

    // Adds item to order; used in duplicateSelectedItem()
    const addItemToOrder = (item) => {
        setOrder((prevOrder) => [...prevOrder, item]);

        if (item.category === "Combos") {
            navigate("/cashiers/combos");
        }
    };

    // Deletes combo when (x) button clicked, navigates back to home
    const deleteItem = (index) => {
        setOrder((prevOrder) => prevOrder.filter((_, i) => i !== index));

        if (index === selectedIndex) {
            setSelectedIndex(null);
        }

        if (index === comboIndex) {
            navigate("/cashiers/home", { state: { order } });
        }
    };

    // Duplicates highlighted item in order
    const duplicateSelectedItem = () => {
        if (selectedIndex === null) {
            return;
        }

        addItemToOrder(order[selectedIndex]);

        setSelectedIndex(null);
    }

    // Clears order
    const clearOrder = () => {
        setOrder([]);
    };

    // Sums price of items in order
    const getTotalPrice = useMemo(() => {
        const total = order.reduce((total, item) => total + item.price, 0);

        return (total * (priceModifier || 1)).toFixed(2);
    }, [order, priceModifier]);

    // Navigates to submit screen
    const submitScreen = () => {
        navigate("/cashiers/submit", { state: { order } });
    }

    // Navigates back to home screen, checks for valid combo
    const goBack = () => {

        if (combo && (combo.side || combo.entrees.length > 0)) {
            navigate("/cashiers/home", { state: { order } });
            return;
        }

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

    // Adds 1 side to a combo object
    const addSideToCombo = (side) => {
        if (combo) {
            if (combo.name === "A La Carte") {
                // Clear previous selection and replace with the new side
                const updatedCombo = {
                    ...combo,
                    side,
                    entrees: [], // Ensure no entrees are present
                };
                const newOrder = [...order];
                newOrder[comboIndex] = updatedCombo;
                setOrder(newOrder);
            } else {
                // For other combos, add the side as usual
                const updatedCombo = {
                    ...combo,
                    side,
                };
                const newOrder = [...order];
                newOrder[comboIndex] = updatedCombo;
                setOrder(newOrder);
            }
        }
    };

    // Adds 1 entree to a combo object
    const addEntreeToCombo = (entree) => {
        if (combo) {
            if (combo.name === "A La Carte") {
                // Clear previous selection and replace with the new entree
                const updatedCombo = {
                    ...combo,
                    entrees: [entree], // Ensure only this entree is present
                    side: null, // Ensure no sides are present
                };
                const newOrder = [...order];
                newOrder[comboIndex] = updatedCombo;
                setOrder(newOrder);
            } else {
                // For other combos, add the entree as usual
                if (combo.entrees.length < maxEntrees) {
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
            }
        }
    };

    // Clear entrees and sides from combo
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

    // Removes combo from order and back-navigates
    const removeFromOrder = () => {
        setOrder((prevOrder) => prevOrder.filter((item) => item.id !== comboId));
        navigate("/cashiers/home", { state: { order } });
    }

    // Gets header based on weather discount
    const getDiscountMessage = (priceModifier) => {
        if (priceModifier === 0.9) {
            return "Current Order - 10% discount";
        } else if (priceModifier === 0.95) {
            return "Current Order - 5% discount";
        } else {
            return "Current Order";
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
                                    )))}
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