import React from "react";
import "./Customer.css";
import {useLocation, useNavigate} from "react-router-dom";
import Tran from "./Translation.jsx"

function OrderComplete({language, changeLanguage}) {
    const {state} = useLocation();
    const {paymentType, totalCost, order} = state || {};
    const navigate = useNavigate();

    const redirect = () => {
        navigate("../welcome");
    };

    return(
        <>
            <div className = "ellipse" onClick = {redirect}>
                <Tran word="Order Complete!" lang={language} /> <br></br>
                <Tran word="Order Number:" lang={language} /> {order?.order_id} <br/>
                <Tran word="Payment Type:" lang={language} /> <Tran word={paymentType} lang={language} /> <br/>
                <Tran word="Total Amount:" lang={language} /> ${totalCost.toFixed(2)} 
            </div>
            <button className="translate-button" onClick={() => changeLanguage()}>
                <Tran word="Change Language" lang={language} />
            </button>
        </>
        
    );
}

export default OrderComplete;