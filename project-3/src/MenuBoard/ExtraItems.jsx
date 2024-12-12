import React from 'react';
import './MenuBoard.css';

/**
 * @author Allen Yu
 * 
 * Displays the names and images of extra items to the customers
 */

function ExtraItems() {
    return (
        <div className="menu appetizers">
            <h2>Appetizers, Deserts, & Drinks</h2>
            <ul>
                <li>
                    <img src="https://i.imgur.com/Ah9KkZA.png" alt="Crispy Egg rolls with cabbage, carrots, green onions & chicken in a crispy Wonton wrapper" />
                    <span>Chicken Egg Roll - $1.90</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/KMa6KVU.png" alt="Crispy vegetable rolls with cabbage, celery, carrots, green onions & Chinese noodles in a crispy Wonton wrapper" />
                    <span>Veggie Spring Roll - $1.90</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/wZTyu3W.png" alt="Wonton wrappers filled with cream cheese and served with sweet and sour sauce" />
                    <span>Cream Cheese Rangoon (3 pieces) - $1.95</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/RyGK27Y.jpeg" alt="Crispy fried churro filled with an apple mixture and tossed in cinnamon and sugar" />
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
