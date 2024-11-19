import React, { useState } from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import { useMenu } from "../../MenuContext";

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
    const [numSelectedEntrees, setNumSelectedEntrees] = useState(0);

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
        setNumSelectedEntrees(0);
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
        if (selectedEntrees.includes(entree)) {
            setSelectedEntrees(selectedEntrees.filter(e => e !== entree));
            setNumSelectedEntrees(numSelectedEntrees - 1);
        } 
        else if (numSelectedEntrees < combo.maxEntrees) {
            setSelectedEntrees([...selectedEntrees, entree]);
            setNumSelectedEntrees(numSelectedEntrees + 1);
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
                            <img src="https://placehold.co/200x200" alt="placeholder" />
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
                                <button className = {`entree-button ${selectedEntrees.includes(entree) ? "selected" : ""}`} key = {entree.id} onClick = {() => handleSelectEntrees(entree, currentCombo)}>
                                    <img src="https://placehold.co/100x100" alt="placeholder" />
                                    <span>{entree.name}</span>
                                </button>
                            ))
                        ) : (
                            sideOptions.map(side => (
                                <button className = {`side-button ${selectedSide === side ? "selected" : ""}`} key = {side.id} onClick = {() => handleSelectSide(side)}>
                                    <img src="https://placehold.co/200x200" alt="placeholder" />
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



