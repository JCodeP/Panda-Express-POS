import React, { useState } from 'react';
import './MenuBoard.css';

function MenuBoard() {
    const [activeMenu, setActiveMenu] = useState('sides');
    return (
        <div className="board">
            <h1>Panda Express Menu</h1>
            {activeMenu === 'size' && (
                <div className="menu size">
                    <h2>Order Sizes</h2>
                    <ul>
                        <li> 
                            <img src="bowl.avif" alt="Bowl"/>
                            <span>Bowl (1 side, 1 entree) - $7.80</span>
                        </li>
                        <li>
                            <img src="plate.avif" alt="Plate"/>
                            <span>Plate (1 side, 2 entrees) - $8.90</span>
                        </li>
                        <li>
                            <img src="biggerplate.avif" alt="Bigger Plate"/>
                            <span>&nbsp;Bigger Plate &nbsp; (1 side, 3 entrees) - $10</span>
                        </li>
                    </ul>
                </div>
            )}
            {activeMenu === 'sides' && (
                <div className="menu sides">
                    <h2>Sides</h2>
                    <ul>
                        <li>
                        <img src="chowmein.webp" alt="Chow Mein"/>
                            <span>Chow Mein</span>
                        </li>
                        <li>
                            <img src="friedrice.webp" alt="Fried Rice"/>
                            <span>Fried Rice</span>
                        </li>
                        <li>
                            <img src="whiterice.webp" alt="Steamed White Rice"/>
                            <span>Steamed White Rice</span>
                        </li>
                        <li>
                            <img src="supergreens.webp" alt="Super Greens"/>
                            <span>Super Greens</span>
                        </li>
                    </ul>
                </div>
            )}
            {activeMenu === 'entrees' && (
                <div className="menu entrees">
                    <h2>Entrees</h2>
                    <ul>
                        <li>
                            <img src="orange.webp" alt="Orange Chicken"/>
                            <span>Orange Chicken</span>
                        </li>
                        <li>
                            <img src="beijing.webp" alt="Beijing Beef"/>
                            <span>Beijing Beef</span>
                        </li>
                        <li>
                            <img src="kungpao.webp" alt="Kung Pao Chicken"/>
                            <span>Kung Pao Chicken</span>
                        </li>
                        <li>
                            <img src="walnut.webp" alt="Honey Walnut Shrimp"/>
                            <span>Honey Walnut Shrimp</span>
                        </li>
                        <li>
                            <img src="teriyaki.webp" alt="Grilled Teriyaki Chicken"/>
                            <span>Grilled Teriyaki Chicken</span>
                        </li>
                        <li>
                            <img src="broccoli.webp" alt="Broccoli Beef"/>
                            <span>Broccoli Beef</span>
                        </li>
                        <li>
                            <img src="sweetfire.jpg" alt="SweetFire Chicken Breast"/>
                            <span>SweetFire Chicken Breast</span>
                        </li>
                        <li>
                            <img src="steak.webp" alt="Black Pepper Angus Steak"/>
                            <span>Black Pepper Angus Steak</span>
                        </li>
                        <li>
                            <img src="sesame.webp" alt="Honey Sesame Chicken"/>
                            <span>Honey Sesame Chicken</span>
                        </li>
                        <li>
                        <img src="stringbean.jpg" alt="String Bean Chicken Breast"/>
                            <span>String Bean Chicken Breast</span>
                        </li>
                        <li>
                            <img src="mushroom.webp" alt="Mushroom Chicken"/>
                            <span>Mushroom Chicken</span>
                        </li>
                        <li>
                            <img src="blackpepper.webp" alt="Black Pepper Chicken"/>
                            <span>Black Pepper Chicken</span>
                        </li>
                    </ul>
                </div>   
            )}
            {activeMenu === 'appetizers' && (    
                <div className="menu appetizers">
                    <h2>Appetizers, Deserts, & Drinks</h2>
                    <ul>
                        <li>
                            <img src="chicken.webp" alt="Chicken Egg Roll"/>
                            <span>Chicken Egg Roll  - $1.90</span>
                        </li>
                        <li>
                            <img src="veggie.webp" alt="Veggie Spring Roll"/>
                            <span>Veggie Spring Roll  - $1.90</span>
                        </li>
                        <li>
                            <img src="rangoon.webp" alt="Cream Cheese Rangoon"/>
                            <span>Cream Cheese Rangoon (3 pieces) - $1.95</span>
                        </li>
                        <li>
                            <img src="applepie.jpg" alt="Apple Pie Roll"/>
                            <span>Apple Pie Roll - $2</span>
                        </li>
                        <li>
                            <img src="fountaindrink.jpg" alt="Fountain Drink"/>
                            <span>Fountain Drink - $1.70</span>
                        </li>
                    </ul>
                </div>
            )}
            <div className="menu-buttons">
                <button className="menu-button" onClick={() => setActiveMenu('size')}>Order Size</button>
                <button className="menu-button" onClick={() => setActiveMenu('sides')}>Sides</button>
                <button className="menu-button" onClick={() => setActiveMenu('entrees')}>Entrees</button>
                <button className="menu-button" onClick={() => setActiveMenu('appetizers')}>Appetizers, Deserts, & Drinks</button>
            </div>
        </div>
    );
}

export default MenuBoard;