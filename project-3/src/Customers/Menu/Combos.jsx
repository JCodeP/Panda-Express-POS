import React, { useState } from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import { useMenu } from "../../MenuContext";

function Combos() {
    const [showCombos, setShowCombos] = useState(true);
    const [showEntrees, setShowEntrees] = useState(false);
    const chooseCombo = () => {
        setShowCombos(false); 
    };
    const cancelCombo = () => {
        setShowEntrees(false);
        setShowCombos(true); 
    };
    const chooseEntree = () => {
        setShowEntrees(true);
    };
    const chooseSide = () => {
        setShowEntrees(false); 
    };

    const { menuItems } = useMenu();
    const comboOptions = menuItems.filter(item => item.category === "Combos");
    const { entrees } = useMenu();
    const entreeOptions = entrees;
    const { sides } = useMenu();
    const sideOptions = sides;

    return(
        <>
            
            {showCombos ? (
                <div className = "combo-box">
                    {comboOptions.map(combo => (
                    <button className = "combo-button" key = {comboOptions.id} onClick = {chooseCombo}>
                        <img src="https://placehold.co/200x200" alt="placeholder" />
                        <div className="separator" />
                        <span>{combo.name}</span>
                    </button>
                    ))}
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
                            <button className = "entree-button" key = {entree.id} onClick>
                                <img src="https://placehold.co/100x100" alt="placeholder" />
                                <div className="separator" />
                                <span>{entree.name}</span>
                            </button>
                        ))
                    ) : (
                        sideOptions.map(side => (
                            <button className = "side-button" key = {side.id}>
                                <img src="https://placehold.co/100x100" alt="placeholder" />
                                <div className="separator" />
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



