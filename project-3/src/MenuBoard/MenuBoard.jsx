import React from 'react';
import { Link } from 'react-router-dom';
import './MenuBoard.css';

/**
 * @author Allen Yu
 * 
 * Creates menu board home page that directs to four separate, non-interactive pages: one page for order size, one page for sides, one page for entrees, and one page for extra items
 */

function MenuBoard() {
    return (
        <div className="menu-board">
            <h1 className="menu-title">Panda Express Menu</h1>
            <div className="card-container">
                <Link to="/menu/order-size" className="card-link">
                    <div className="card">
                        <h2>Order Size</h2>
                    </div>
                </Link>
                <Link to="/menu/sides" className="card-link">
                    <div className="card">
                        <h2>Sides</h2>
                    </div>
                </Link>
                <Link to="/menu/entrees" className="card-link">
                    <div className="card">
                        <h2>Entrees</h2>
                    </div>
                </Link>
                <Link to="/menu/extra-items" className="card-link">
                    <div className="card">
                        <h2>Extra Items</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default MenuBoard;
