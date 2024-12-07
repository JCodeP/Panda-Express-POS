import React from 'react';
import './MenuBoard.css';

// FOOD DESCRIPTIONS FROM: https://www.pandaexpress.ca/our-food

function Sides() {
    return (
        <div className="menu sides">
            <h2>Sides</h2>
            <ul>
                <li>
                    <img src="https://i.imgur.com/o1JMHr0.png" alt="Stir-fried wheat noodles with onions, celery and cabbage" />
                    <span>Chow Mein</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/riymn3i.png" alt="Steamed white rice with soy sauce, eggs, peas, carrots and green onions" />
                    <span>Fried Rice</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/jOAR92e.png" alt="Plain steamed rice" />
                    <span>Steamed White Rice</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/QHWRw40.png" alt="Healthy combination of broccoli, carrots, cabbage & zucchini" />
                    <span>Super Greens</span>
                </li>
            </ul>
        </div>
    )
}

export default Sides;