import React, { useState } from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import { useMenu } from "../../MenuContext";

function QuantityButton ({quantity, updateQuantity, maxQuantity}) {
    const increaseQuantity = () => { if (quantity < maxQuantity) updateQuantity(quantity + 1); };
    const decreaseQuantity = () => updateQuantity(quantity > 0 ? quantity - 1 : 0);
    return (
        <div className="quantity-button">
            <button className="decrease" onClick={decreaseQuantity}>-</button>
            <span className="quantity-counter">{quantity}</span>
            <button className="increase" onClick={increaseQuantity}>+</button>
        </div>
    );
}

function Combos() {
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
    const [sideQuantities, setSideQuantities] = useState({});

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
        setSideQuantities({});
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
            const updatedQuantities = {...entreeQuantities};
            delete updatedQuantities[entree.id];
            setEntreeQuantities(updatedQuantities);
        } 
        else if (totalQuantity < combo.maxEntrees) {
            setSelectedEntrees([...selectedEntrees, entree]);
            setEntreeQuantities({ ...entreeQuantities, [entree.id]: 1 });
        }
        
    }

    return(
        <>
            
            {showCombos ? (
                <div className = "combo-box">
                    <div className = "box-title">Combos</div>
                    <div className = "separator"/>
                    <div className = "combo-button-box">
                        {comboOptions.map(combo => (
                        <button className = "combo-button" key = {combo.id} onClick = {() => chooseCombo(combo)}>
                            <img src= {combo.imageURL} alt={combo.name} />
                            {/* <div className="separator" /> */}
                            <span>{combo.name}</span>
                        </button>
                        ))}
                    </div>
                </div>
                
            ) : (
                <div className = "item-box">
                    <div className = "item-nav">
                        <button className = "item-nav-button" onClick = {chooseSide}>
                            Sides
                        </button>
                        <button className = "item-nav-button" onClick = {chooseEntree}>
                            Entrees
                        </button>
                        <button className = "item-nav-button" onClick = {cancelCombo}>
                            Cancel
                        </button>
                    </div>
                    <div className = "item-button-box">
                        {showEntrees ? (
                            entreeOptions.map(entree => (
                                <div className={`entree-item ${selectedEntrees.includes(entree) ? "selected" : ""}`} key={entree.id}>
                                    <button className = {`entree-button ${selectedEntrees.includes(entree) ? "selected" : ""}`} key = {entree.id} onClick = {() => handleSelectEntrees(entree, currentCombo)}>
                                        <img src= {entree.imageURL} alt={entree.name} />
                                        <span>{entree.name}</span>
                                    </button>
                                    {selectedEntrees.includes(entree) && (
                                        <QuantityButton
                                            quantity={entreeQuantities[entree.id] || 1}
                                            maxQuantity={currentCombo.maxEntrees - Object.values(entreeQuantities).reduce((sum, qty) => sum + qty, 0) + (entreeQuantities[entree.id] || 0)}
                                            updateQuantity={(quantity) => {
                                                setEntreeQuantities({...entreeQuantities, [entree.id]: quantity});
                                            }}
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            sideOptions.map(side => (
                                <button className = {`side-button ${selectedSide === side ? "selected" : ""}`} key = {side.id} onClick = {() => handleSelectSide(side)}>
                                    <img src={side.imageURL} alt= "side.name" />
                                    <span>{side.name}</span>
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



