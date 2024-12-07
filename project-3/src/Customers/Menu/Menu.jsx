import React, { useState } from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import Orders from "./Orders.jsx";
import Combos from "./Combos.jsx";
import Addon from "./Addon.jsx";
import Tran from "../Translation.jsx"

function Menu({language, changeLanguage}) {
    
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