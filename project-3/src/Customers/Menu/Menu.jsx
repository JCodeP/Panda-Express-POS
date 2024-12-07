import React, { useState } from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import Orders from "./Orders.jsx";
import Combos from "./Combos.jsx";
import Addon from "./Addon.jsx";
import Tran from "../Translation.jsx"

function Menu({language, changeLanguage}) {

    const [preferences, setPreferences] = useState([
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

    ]);
    
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
            </>
            <Addon addItems={addItems} language={language} changeLanguage={changeLanguage} />
        </div>
        
    );
}

export default Menu;