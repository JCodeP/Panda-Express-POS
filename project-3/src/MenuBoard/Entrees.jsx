import React from 'react';
import './MenuBoard.css';

/**
 * @author Allen Yu
 * 
 * Displays the names and images of entree items to the customers
 */

function Entrees() {
    return (
        <div className="menu entrees">
            <h2>Entrees</h2>
            <ul>
                <li>
                    <img src="https://i.imgur.com/6iVwEfs.png" alt="Our signature dish. Crispy chicken wok-tossed in a sweet and spicy orange sauce" />
                    <span>Orange Chicken</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/nGs4uXa.png" alt="Crispy beef, bell peppers and onions in a sweet-tangy sauce" />
                    <span>Beijing Beef</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/lcBELCI.png" alt="A Szechwan-inspired dish with chicken, peanuts and vegetables, finished with chili peppers" />
                    <span>Kung Pao Chicken</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/9zZIa3I.png" alt="Large tempura-battered shrimp, wok-tossed in a honey sauce and topped with glazed walnuts" />
                    <span>Honey Walnut Shrimp</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/zEPSr9C.png" alt="Grilled chicken thigh hand-sliced to order and served with teriyaki sauce" />
                    <span>Grilled Teriyaki Chicken</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/4ZwloQc.png" alt="A classic favorite. Tender beef and fresh broccoli in a ginger soy sauce" />
                    <span>Broccoli Beef</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/qQPCCeW.jpeg" alt="Fried chicken breast pieces tossed with red peppers and pineapple" />
                    <span>SweetFire Chicken Breast</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/x1dPPWf.png" alt="Angus steak wok-seared with onions, red bell peppers and mushrooms in a savory black pepper sauce" />
                    <span>Black Pepper Angus Steak</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/p8OLsll.png" alt="Thin, crispy chicken strips with green beans and crispy yellow bell peppers with our delicious honey sesame seed sauce" />
                    <span>Honey Sesame Chicken</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/stringbean.jpg" alt="Tender chicken breast pieces tossed with fresh green beans" />
                    <span>String Bean Chicken Breast</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/YxcPkcd.jpeg" alt="Chicken, mushrooms and zucchini stir-fried in a wok with a soy and ginger sauce" />
                    <span>Mushroom Chicken</span>
                </li>
                <li>
                    <img src="https://i.imgur.com/K1iPAOl.png" alt="Marinated chicken, celery and onions in a bold black pepper sauce" />
                    <span>Black Pepper Chicken</span>
                </li>
            </ul>
        </div>
    )
}

export default Entrees;
