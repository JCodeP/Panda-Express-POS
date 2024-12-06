import React from 'react';
import './MenuBoard.css';

function Entrees() {
    return (
        <div className="menu entrees">
            <h2>Entrees</h2>
            <ul>
                <li>
                    <img src="/rsc/menu_icons/orange.webp" alt="Our signature dish. Crispy chicken wok-tossed in a sweet and spicy orange sauce" />
                    <span>Orange Chicken</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/beijing.webp" alt="Crispy beef, bell peppers and onions in a sweet-tangy sauce" />
                    <span>Beijing Beef</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/kungpao.webp" alt="A Szechwan-inspired dish with chicken, peanuts and vegetables, finished with chili peppers" />
                    <span>Kung Pao Chicken</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/walnut.webp" alt="Large tempura-battered shrimp, wok-tossed in a honey sauce and topped with glazed walnuts" />
                    <span>Honey Walnut Shrimp</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/teriyaki.webp" alt="Grilled chicken thigh hand-sliced to order and served with teriyaki sauce" />
                    <span>Grilled Teriyaki Chicken</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/broccoli.webp" alt="A classic favorite. Tender beef and fresh broccoli in a ginger soy sauce" />
                    <span>Broccoli Beef</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/sweetfire.jpg" alt="Fried chicken breast pieces tossed with red peppers and pineapple" />
                    <span>SweetFire Chicken Breast</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/steak.webp" alt="Angus steak wok-seared with onions, red bell peppers and mushrooms in a savory black pepper sauce" />
                    <span>Black Pepper Angus Steak</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/sesame.webp" alt="Thin, crispy chicken strips with green beans and crispy yellow bell peppers with our delicious honey sesame seed sauce" />
                    <span>Honey Sesame Chicken</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/stringbean.jpg" alt="Tender chicken breast pieces tossed with fresh green beans" />
                    <span>String Bean Chicken Breast</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/mushroom.webp" alt="Chicken, mushrooms and zucchini stir-fried in a wok with a soy and ginger sauce" />
                    <span>Mushroom Chicken</span>
                </li>
                <li>
                    <img src="/rsc/menu_icons/blackpepper.webp" alt="Marinated chicken, celery and onions in a bold black pepper sauce" />
                    <span>Black Pepper Chicken</span>
                </li>
            </ul>
        </div>
    )
}

export default Entrees;