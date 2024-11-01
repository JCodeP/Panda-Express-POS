import React from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import Orders from "./Orders.jsx";

function Menu() {
    const navigate = useNavigate();

    const redirect = () => {
        navigate("../ordercomplete");
    }

    return(
        <div className = "container">
            <Orders />
            <div className = "mealbox"></div>
            <div className = "addonbox"></div>
        </div>
        
    );
}

export default Menu;