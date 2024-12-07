import React, {useState} from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
// import { tran } from "../../Backend/APIs/Translate.js"

// function tran(word, t) {
    
//     return (
//         <>{t(word)}</>
//     );
// }

function Orders( {order, setOrder} ) {
    const { t } = useTranslation();
    
    const navigate = useNavigate();

    /*const [order, setOrder] = useState([
        //Temp values
        { name: 'Combo Meal', price: 9.99 },
        { name: 'Appetizer', price: 4.50 },
        { name: 'Drink', price: 1.99 },
        { name: 'Drink', price: 2.99 }
    ]);*/

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
                {tran("Orders", t)}
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
                        <span className="item-name">{item.name}</span>
                        {item.price > 0 && <span className="item-price">${item.price.toFixed(2)}</span>}
                    </li>
                ))}
            </ul>
            <div className = "separator" />
            <button className = "complete-order-button" onClick = {redirectComplete}>
                Pay
            </button>
            <button className = "cancel-order-button" onClick = {redirectCancel}>
                Cancel
            </button>
        </div>
    );
}

export default Orders;