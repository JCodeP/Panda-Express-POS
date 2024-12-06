import React from "react";
import "./Customer.css";
import {useLocation, useNavigate} from "react-router-dom";

function OrderComplete() {
    const {state} = useLocation();
    const {paymentType, totalCost, order} = state || {};
    const navigate = useNavigate();

    const redirect = () => {
        navigate("../welcome");
    };

    return(
        <div className = "ellipse" onClick = {redirect}>
            Order Complete! <br></br>
            Order Number: {order?.order_id} <br/>
            Payment Type: {paymentType} <br/>
            Total Amount: ${totalCost.toFixed(2)} 
        </div>
    );
}

export default OrderComplete;