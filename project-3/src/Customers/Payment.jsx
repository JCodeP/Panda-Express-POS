import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Customer.css";

function Payment() {
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
                <h1>Payment</h1>
                <p>Total: ${totalCost?.toFixed(2) || "0.00"}</p>
                <div className="payment-types">
                    <button className={paymentType === "card" ? "selected" : ""} onClick={() => setPaymentType("card")} disabled={loading}>
                        Card
                    </button>
                    <button className={paymentType === "cash" ? "selected" : ""} onClick={() => setPaymentType("cash")} disabled={loading}>
                        Cash
                    </button>
                    <button className={paymentType === "gift card" ? "selected" : ""} onClick={() => setPaymentType("gift card")} disabled={loading}>
                        Gift Card
                    </button>
                </div>
                <button className="complete-payment-button" onClick={handlePayment} disabled={loading}>
                    {loading ? "Processing..." : "Complete Payment"}
                </button>
            </div>
        </div>
    );
}

export default Payment;
