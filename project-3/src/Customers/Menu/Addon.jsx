import React, { useState } from "react";
import "../Customer.css";
import { useMenu } from "../../MenuContext";
import Tran from "../Translation.jsx";

function Addon({addItems, language, changeLanguage}) {
    const { appetizers } = useMenu();
    const { drinks } = useMenu();

    return(
        <div className = "addon-box">
            <div className="box-title"><Tran word="Add-Ons" lang={language} /></div>
            <div className="separator" />

            <div className="addon-title"><Tran word="Appetizers" lang={language} /></div>
            <div className="addon-button-box">
            {appetizers.map(appetizer => (
                    <button className="addon-button" key={appetizer.appetizer_id} onClick={() => addItems([appetizer])}>
                        <img src={appetizer.image} alt={appetizer.item_name} />
                        {/* <div className="separator" /> */}
                        <span><Tran word={appetizer.item_name} lang={language} /></span>
                    </button>
                ))}
            </div>
            
            <div className="separator" />
            <div className="addon-title"><Tran word="Drinks" lang={language} /></div>
            <div className="addon-button-box">
            {drinks.map(drink => (
                    <button className="addon-button" key={drink.drink_id} onClick={() => addItems([drink])}>
                        <img src={drink.image} alt={drink.item_name} />
                        {/* <div className="separator" /> */}
                        <span><Tran word={drink.item_name} lang={language} /></span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Addon;
