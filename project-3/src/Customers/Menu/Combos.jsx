import React, { useState } from "react";
import "../Customer.css";
import { useMenu } from "../../MenuContext";
import Tran from "../Translation.jsx";

function QuantityButton({ quantity, updateQuantity, maxQuantity, entree, removeEntree }) {
    const increaseQuantity = () => { if (quantity < maxQuantity) updateQuantity(quantity + 1); };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            updateQuantity(quantity - 1);
        }
        else {
            removeEntree(entree.entree_id);
        }
    };
    return (
        <div className="quantity-button">
            <button className="decrease" onClick={decreaseQuantity}>-</button>
            <span className="quantity-counter">{quantity}</span>
            <button className="increase" onClick={increaseQuantity}>+</button>
        </div>
    );
}

function Combos({addItems, language, changeLanguage}) {
    //setting menu variables
    const { comboOptions } = useMenu()
    const { entrees } = useMenu();
    const entreeOptions = entrees;
    const { sides } = useMenu();
    const sideOptions = sides;

    //variables for combo screen state control
    const [showCombos, setShowCombos] = useState(true);
    const [showEntrees, setShowEntrees] = useState(false);
    const [currentCombo, setCurrentCombo] = useState(null);

    //variables for combo selection validation
    const [selectedSide, setSelectedSide] = useState(null);
    const [selectedEntrees, setSelectedEntrees] = useState([]);
    const [entreeQuantities, setEntreeQuantities] = useState({});


    //functions for combo screen state control
    const chooseCombo = (combo) => {
        setCurrentCombo(combo);
        setShowCombos(false);
    };
    const cancelCombo = () => {
        setCurrentCombo(null);
        setShowEntrees(false);
        setShowCombos(true);
        setSelectedSide(null);
        setSelectedEntrees([]);
        setEntreeQuantities({});
    };
    const chooseEntree = () => {
        setShowEntrees(true);
    };
    const chooseSide = () => {
        setShowEntrees(false);
    };



    //functions for handling selections of combo items
    const handleSelectSide = (side) => {
        setSelectedSide(selectedSide === side ? null : side);
    };
    const handleSelectEntrees = (entree, combo) => {
        const totalQuantity = Object.values(entreeQuantities).reduce((sum, qty) => sum + qty, 0);
        if (selectedEntrees.includes(entree)) {
            setSelectedEntrees(selectedEntrees.filter(e => e !== entree));
            const updatedQuantities = { ...entreeQuantities };
            delete updatedQuantities[entree.entree_id];
            setEntreeQuantities(updatedQuantities);
        }
        else if (totalQuantity < combo.maxEntrees) {
            setSelectedEntrees([...selectedEntrees, entree]);
            setEntreeQuantities({ ...entreeQuantities, [entree.entree_id]: 1 });
        }

    }

    const removeEntree = (id) => {
        setSelectedEntrees(selectedEntrees.filter(entree => entree.entree_id !== id));
        const updatedQuantities = { ...entreeQuantities };
        delete updatedQuantities[id];
        setEntreeQuantities(updatedQuantities);
    };

    const placeOrder = () => {
        const newOrderItems = [{ name: currentCombo.item_name, price: currentCombo.price }];
        if (selectedSide) {
            newOrderItems.push({ name: selectedSide.item_name, price: 0 });
        }
        selectedEntrees.forEach((entree) => {
            const quantity = entreeQuantities[entree.entree_id] || 1;
            for (let i = 0; i < quantity; i++) {
                newOrderItems.push({ name: entree.item_name, price: 0 });
            }
        });
        addItems(newOrderItems);
        cancelCombo();
    };

    const getComboAltText = (combo) => {
        if (combo.item_name === "A La Carte") {
            return "A La Carte, 1 entree or side";
        }
        if (combo.item_name === "Bowl") {
            return "Bowl, 1 entree and 1 side";
        }
        if (combo.item_name === "Plate") {
            return "Plate, 2 entrees and 1 side";
        }
        if (combo.item_name === "Bigger Plate") {
            return "Bigger Plate, 3 entrees and 1 sides";
        }
        return "";
    }

    return (
        <>

            {showCombos ? (
                <div className="combo-box">
                    <div className="box-title"><Tran word="Combos" lang={language} /></div>
                    <div className="separator" />
                    <div className="combo-button-box">
                        {comboOptions.map(combo => (
                            <button className="combo-button" key={combo.id} onClick={() => chooseCombo(combo)}>
                                <img src={combo.imageURL} alt={getComboAltText(combo)} />
                                {/* <div className="separator" /> */}
                                <span><Tran word={combo.item_name} lang={language} /></span>
                            </button>
                        ))}
                    </div>
                </div>

            ) : (
                <div className = "item-box">
                    <div className = "item-nav">
                        <button className = "item-nav-button" onClick = {chooseSide}>
                            <Tran word="Sides" lang={language} />
                        </button>
                        <button className = "item-nav-button" onClick = {chooseEntree}>
                            <Tran word="Entrees" lang={language} />
                        </button>
                        <button className="item-nav-button" onClick={placeOrder}>
                            <Tran word="Place Order" lang={language} />
                        </button>
                        <button className = "item-nav-button" onClick = {cancelCombo}>
                            <Tran word="Cancel" lang={language} />
                        </button>
                    </div>
                    <div className="item-button-box">
                        {showEntrees ? (
                            entreeOptions.map(entree => (
                                <div className={`entree-item ${selectedEntrees.includes(entree) ? "selected" : ""}`} key={entree.entree_id}>
                                    <button className = {`entree-button ${selectedEntrees.includes(entree) ? "selected" : ""}`} key = {entree.entree_id} onClick = {() => handleSelectEntrees(entree, currentCombo)}>
                                        <img src= {entree.image} alt={entree.item_name} />
                                        <span><Tran word={entree.item_name} lang={language} /></span>
                                    </button>
                                    {selectedEntrees.includes(entree) && (
                                        <QuantityButton
                                            entree={entree}
                                            quantity={entreeQuantities[entree.entree_id] || 1}
                                            maxQuantity={currentCombo.maxEntrees - Object.values(entreeQuantities).reduce((sum, qty) => sum + qty, 0) + (entreeQuantities[entree.entreeid] || 0)}
                                            updateQuantity={(quantity) => { setEntreeQuantities({ ...entreeQuantities, [entree.entree_id]: quantity }); }}
                                            removeEntree={removeEntree}
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            sideOptions.map(side => (
                                <button className = {`side-button ${selectedSide === side ? "selected" : ""}`} key = {side.side_id} onClick = {() => handleSelectSide(side)}>
                                    <img src={side.image} alt= "side.item_name" />
                                    <span><Tran word={side.item_name} lang={language} /></span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}

        </>


    );
}

export default Combos;



