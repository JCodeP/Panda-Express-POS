import React from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";

function Orders() {
    return(
        <div className = "orderbox">
            Order
            <div className = "separator" />
            <div className = "completeorderbutton" />
        </div>
    );
}

export default Orders;