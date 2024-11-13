import React from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import Orders from "./Orders.jsx";
import Combos from "./Combos.jsx";

function Menu() {
    

    return(
        <div className = "container">
            <Orders />
            <Combos />
            <div className = "addon-box"></div>
        </div>
        
    );
}

export default Menu;