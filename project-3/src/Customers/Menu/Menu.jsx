import React, { useState } from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import Orders from "./Orders.jsx";
import Combos from "./Combos.jsx";

function Menu() {
    
    const [order, setOrder] = useState([]); 

    const addItems = (newItems) => {
        setOrder((prevOrder) => [...prevOrder, ...newItems]); 
    };

    return(
        <div className = "container">
            <Orders order={order} setOrder={setOrder} />
            <Combos addItems={addItems} />
            <div className = "addon-box"></div>
        </div>
        
    );
}

export default Menu;