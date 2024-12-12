import React from 'react';
import './MenuBoard.css';

/**
 * @author Allen Yu
 * 
 * Displays the names and images of order sizes to customers
 */

function OrderSize() {
    return (
        <div className="menu size">
            <h2>Order Sizes</h2>
            <ul>
                <li>
                    <img src="/rsc/menu_icons/bowl.avif" alt="Bowl, 1 entree and 1 side" />
                    <span>Bowl (1 side, 1 entree) - $7.80</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/plate.avif" alt="Plate, 2 entrees and 1 side" />
                    <span>Plate (1 side, 2 entrees) - $8.90</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/biggerplate.avif" alt="Bigger Plate, 3 entrees and 1 side" />
                    <span>&nbsp;Bigger Plate &nbsp; (1 side, 3 entrees) - $10</span>
                </li>
            </ul>
        </div>
    )
}

export default OrderSize;
