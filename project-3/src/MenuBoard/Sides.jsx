import React from 'react';
import './MenuBoard.css';

// FOOD DESCRIPTIONS FROM: https://www.pandaexpress.ca/our-food

function Sides() {
    return (
        <div className="menu sides">
            <h2>Sides</h2>
            <ul>
                <li>
                    <img src="/rsc/menu_icons/chowmein.webp" alt="Stir-fried wheat noodles with onions, celery and cabbage" />
                    <span>Chow Mein</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/friedrice.webp" alt="Steamed white rice with soy sauce, eggs, peas, carrots and green onions" />
                    <span>Fried Rice</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/whiterice.webp" alt="Plain steamed rice" />
                    <span>Steamed White Rice</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/supergreens.webp" alt="Healthy combination of broccoli, carrots, cabbage & zucchini" />
                    <span>Super Greens</span>
                </li>
            </ul>
        </div>
    )
}

export default Sides;