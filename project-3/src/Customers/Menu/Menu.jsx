import React from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import Orders from "./Orders.jsx";

function Menu() {
    

    return(
        <div className = "container">
            <Orders />
            <div className = "meal-box"></div>
            <div className = "addon-box"></div>
        </div>
        
    );
}

export default Menu;