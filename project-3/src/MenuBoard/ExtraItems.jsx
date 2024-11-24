import React from 'react';
import './MenuBoard.css';

function ExtraItems() {
    return (
        <div className="menu appetizers">
            <h2>Appetizers, Deserts, & Drinks</h2>
            <ul>
                <li>
                    <img src="https://i.imgur.com/Ah9KkZA.png" alt="Chicken Egg Roll" />
                    <span>Chicken Egg Roll - $1.90</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/KMa6KVU.png" alt="Veggie Spring Roll" />
                    <span>Veggie Spring Roll - $1.90</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/wZTyu3W.png" alt="Cream Cheese Rangoon" />
                    <span>Cream Cheese Rangoon (3 pieces) - $1.95</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/RyGK27Y.jpeg" alt="Apple Pie Roll" />
                    <span>Apple Pie Roll - $2</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/ufrbISK.jpeg" alt="Fountain Drink" />
                    <span>Fountain Drink - $1.70</span>
                </li>
            </ul>
        </div>
    )
}

export default ExtraItems;