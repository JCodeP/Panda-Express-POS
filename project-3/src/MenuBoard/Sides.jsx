import React from 'react';
import './MenuBoard.css';

function Sides() {
    return (
        <div className="menu sides">
            <h2>Sides</h2>
            <ul>
                <li>
                    <img src="/rsc/menu_icons/chowmein.webp" alt="Chow Mein"/>
                    <span>Chow Mein</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/friedrice.webp" alt="Fried Rice"/>
                    <span>Fried Rice</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/whiterice.webp" alt="Steamed White Rice"/>
                    <span>Steamed White Rice</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/supergreens.webp" alt="Super Greens"/>
                    <span>Super Greens</span>
                </li>
            </ul>
        </div>
    )
}

export default Sides;