import React, { useState } from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import Orders from "./Orders.jsx";
import Combos from "./Combos.jsx";
import Addon from "./Addon.jsx";
import Tran from "../Translation.jsx"

function Menu({language, changeLanguage}) {

    const zodiacPreferences = [
        { sign: "Aries",        entree: "Orange Chicken",               side: "Chow Mein",          appetizer: "Egg Roll"               },
        { sign: "Taurus",       entree: "Beijing Beef",                 side: "Fried Rice",         appetizer: "Cream Cheese Rangoon"   },
        { sign: "Gemini",       entree: "Honey Sesame Chicken Breast",  side: "White Rice",         appetizer: "Egg Roll"               },
        { sign: "Cancer",       entree: "Grilled Teriyaki Chicken",     side: "White Rice",         appetizer: "Spring Roll"            },
        { sign: "Leo",          entree: "Sweet Fire Chicken Breast",    side: "Super Greens",       appetizer: "Apple Pie Egg Roll"     },
        { sign: "Virgo",        entree: "String Bean Chicken Breast",   side: "Chow Mein",          appetizer: "Egg Roll"               },
        { sign: "Libra",        entree: "Kung Pao Chicken",             side: "Fried Rice",         appetizer: "Egg Roll"               },
        { sign: "Scorpio",      entree: "Black Pepper Angus Steak",     side: "Super Greens",       appetizer: "Cream Cheese Rangoon"   },
        { sign: "Sagittarius",  entree: "Mushroom Chicken",             side: "White Rice",         appetizer: "Egg Roll"               },
        { sign: "Capricorn",    entree: "Broccoli Beef",                side: "White Rice",         appetizer: "Apple Pie Egg Roll"     },
        { sign: "Aquarius",     entree: "Black Pepper Chicken",         side: "Chow Mein",          appetizer: "Spring Roll"            },
        { sign: "Pisces",       entree: "Honey Walnut Shrimp",          side: "Fried Rice",         appetizer: "Cream Cheese Rangoon"   }

    ];

    const [selectedSign, setSelectedSign] = useState(null);

    const handleSelect = (event) => {
        const selected = zodiacPreferences.find(item => item.sign === event.target.value);
        setSelectedSign(selected);
    };

    const closePopup = () => setSelectedSign(null);
    
    const [order, setOrder] = useState([]); 

    const addItems = (newItems) => {
        setOrder((prevOrder) => [...prevOrder, ...newItems]); 
    };

    return(
        <div className = "container">
            <Orders order={order} setOrder={setOrder} language={language} changeLanguage={changeLanguage} />
            <>
                <Combos addItems={addItems} language={language} changeLanguage={changeLanguage} />
                <button className="translate-button" onClick={() => changeLanguage()}>
                    <Tran word="Change Language" lang={language} />
                </button>
                <div>
                    <select className="zodiac-button" onChange={handleSelect} defaultValue="">
                        <option value="" disabled><Tran word="Choose Zodiac" lang={language} /></option>
                        {zodiacPreferences.map((item) => (
                            <option key={item.sign} value={item.sign}><Tran word={item.sign} lang={language} /></option>
                        ))}
                    </select>
                    {selectedSign && (
                        <div className="zodiac-popup">
                            <h2><Tran word={selectedSign.sign} lang={language} /></h2>
                            <p><strong><Tran word="Entree:" lang={language} /></strong> <Tran word={selectedSign.entree} lang={language} /></p>
                            <p><strong><Tran word="Side:" lang={language} /></strong> <Tran word={selectedSign.side} lang={language} /></p>
                            <p><strong><Tran word="Appetizer:" lang={language} /></strong> <Tran word={selectedSign.appetizer} lang={language} /></p>
                            <button className="zodiac-close" onClick={closePopup}>X</button>
                        </div>
                    )}
                    {selectedSign && (
                        <div className="zodiac-close-popup" onClick={closePopup}></div>
                    )}
                </div>
                
            </>
            <Addon addItems={addItems} language={language} changeLanguage={changeLanguage} />
        </div>
        
    );
}

export default Menu;