import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Customer.css";
import Tran from "./Translation.jsx"

function Payment({language, changeLanguage}) {
    const { state } = useLocation();
    const { order, totalCost } = state || {};
    const [paymentType, setPaymentType] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async () => {
        if (!paymentType) {
            alert("You must select either card, cash, or gift card before proceeding");
            return;
        }
        setLoading(true);
        try {
            const result = await fetch("http://localhost:5001/api/process-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    totalCost: totalCost || 0,
                    paymentType,
                }),
            });
            const resultText = await result.text();
            const data = JSON.parse(resultText);  
            navigate("../orderComplete", {state: {paymentType, totalCost, order: data.order},});
        } catch (error) {
            alert(`Error processing your payment: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-section">
            <div className="payment-info">
                <h1><Tran word="Payment" lang={language} /></h1>
                <p><Tran word="Total" lang={language} />: ${totalCost?.toFixed(2) || "0.00"}</p>
                <div className="payment-types">
                    <button className={paymentType === "card" ? "selected" : ""} onClick={() => setPaymentType("card")} disabled={loading}>
                        <Tran word="Card" lang={language} />
                    </button>
                    <button className={paymentType === "cash" ? "selected" : ""} onClick={() => setPaymentType("cash")} disabled={loading}>
                        <Tran word="Cash" lang={language} />
                    </button>
                    <button className={paymentType === "gift card" ? "selected" : ""} onClick={() => setPaymentType("gift card")} disabled={loading}>
                        <Tran word="Gift Card" lang={language} />
                    </button>
                </div>
                <button className="complete-payment-button" onClick={handlePayment} disabled={loading}>
                    <Tran word={loading ? "Processing..." : "Complete Payment"} lang={language} />
                </button>
            </div>
            <button className="translate-button" onClick={() => changeLanguage()}>
                <Tran word="Change Language" lang={language} />
            </button>
        </div>
    );
}

export default Payment;
