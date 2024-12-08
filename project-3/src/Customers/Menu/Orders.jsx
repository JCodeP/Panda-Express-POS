import React, {useState} from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import Tran from "../Translation.jsx"

function Orders( {order, setOrder, language, changeLanguage} ) {
    
    const navigate = useNavigate();

    //Deletes item from list
    const deleteItem = (index) => {
        setOrder((prevOrder) => prevOrder.filter((_, i) => i !== index));
        if (index === selectedIndex) {
            setSelectedIndex(null);
        }
    };

    const calculatePrice = (order) => {
        return order.reduce((total, item) => total + (item.price || 0), 0);
    };

    const redirectComplete = () => {
        navigate("../payment", {state:{order, totalCost: calculatePrice(order)}});
    }

    const redirectCancel = () => {
        navigate("../welcome");
    }

    return(
        <div className = "order-box">
            <div className = "box-title">
                <Tran word="Orders" lang={language} />
            </div>
            <div className = "separator" />
            <ul className = "order-list">
                {order.map((item, index) => (
                    <li
                        key={index}
                    >
                        <button
                            className="delete-button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents the parent `li`'s onClick from firing
                                deleteItem(index);
                            }}
                        >
                            X
                        </button>
                        <span className="item-name"><Tran word={item.item_name || item.name} lang={language} /></span>
                        {item.price > 0 && <span className="item-price">${item.price.toFixed(2)}</span>}
                    </li>
                ))}
            </ul>
            <div className = "separator" />
            <button className = "complete-order-button" onClick = {redirectComplete}>
                <Tran word="Pay" lang={language} />
            </button>
            <button className = "cancel-order-button" onClick = {redirectCancel}>
                <Tran word="Cancel" lang={language} />
            </button>
        </div>
    );
}

export default Orders;