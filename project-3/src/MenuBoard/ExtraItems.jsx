import React from 'react';
import './MenuBoard.css';

function ExtraItems() {
    return (
        <div className="menu appetizers">
            <h2>Appetizers, Deserts, & Drinks</h2>
            <ul>
                <li>
                    <img src="/rsc/menu_icons/chicken.webp" alt="Chicken Egg Roll"/>
                    <span>Chicken Egg Roll - $1.90</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/veggie.webp" alt="Veggie Spring Roll"/>
                    <span>Veggie Spring Roll - $1.90</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/rangoon.webp" alt="Cream Cheese Rangoon"/>
                    <span>Cream Cheese Rangoon (3 pieces) - $1.95</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/applepie.jpg" alt="Apple Pie Roll"/>
                    <span>Apple Pie Roll - $2</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/fountaindrink.jpg" alt="Fountain Drink"/>
                    <span>Fountain Drink - $1.70</span>
                </li>
            </ul>
        </div>
    )
}

export default ExtraItems;