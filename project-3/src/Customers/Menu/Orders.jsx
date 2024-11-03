import React, {useState} from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";

function Orders() {
    const navigate = useNavigate();

    const [order, setOrder] = useState([
        { name: 'Combo Meal', price: 9.99 },
        { name: 'Appetizer', price: 4.50 },
        { name: 'Drink', price: 1.99 }
    ]);
    // const [selectedIndex, setSelectedIndex] = useState(null);

    const deleteItem = (index) => {
        setOrder((prevOrder) => prevOrder.filter((_, i) => i !== index));
        if (index === selectedIndex) {
            setSelectedIndex(null);
        }
    };

    const redirectComplete = () => {
        navigate("../ordercomplete");
    }

    const redirectCancel = () => {
        navigate("../welcome");
    }

    return(
        <div className = "order-box">
            <div className = "box-title">Order</div>
            <div className = "separator" />
            <ul className = "order-list">
                {order.map((item, index) => (
                    <li
                        key={index}
                        // className={index === selectedIndex ? "selected" : ""}
                        // onClick={() => setSelectedIndex(index)}
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
                        <span className="item-price">${item.price.toFixed(2)}</span>
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