import React from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";

function Orders() {
    const navigate = useNavigate();

    const redirectComplete = () => {
        navigate("../ordercomplete");
    }

    const redirectCancel = () => {
        navigate("../welcome");
    }

    return(
        <div className = "orderbox">
            Order
            <div className = "separator" />
            <div className = "separator" />
            <div className = "completeorderbutton" onClick = {redirectComplete}>
                Pay
            </div>
            <div className = "cancelorderbutton" onClick = {redirectCancel}>
                Cancel
            </div>
        </div>
    );
}

export default Orders;