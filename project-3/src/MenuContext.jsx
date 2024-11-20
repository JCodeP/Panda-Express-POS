import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: "Bowl", price: 7.80, category: "Combos" },
        { id: 2, name: "Plate", price: 8.90, category: "Combos" },
        { id: 3, name: "Bigger Plate", price: 10.00, category: "Combos" },
        { id: 4, name: "A La Carte", price: 4.00, category: "Combos" },
        { id: 5, name: "Egg Roll", price: 1.99, category: "Appetizers" },
        { id: 6, name: "Spring Roll", price: 1.99, category: "Appetizers" },
        { id: 7, name: "Cream Cheese Rangoon", price: 1.99, category: "Appetizers" },
        { id: 8, name: "Apple Pie Egg Roll", price: 1.99, category: "Appetizers" },
        { id: 9, name: "Small Drink", price: 1.99, category: "Drinks" },
        { id: 10, name: "Medium Drink", price: 2.29, category: "Drinks" },
        { id: 11, name: "Large Drink", price: 2.59, category: "Drinks" },
        { id: 12, name: "Water Bottle", price: 1.99, category: "Drinks" },
    ]);

    const [comboOptions, setComboOptions] = useState([
        { id: 1, name: "Bowl", maxEntrees: 1, price: 7.80, imageURL: "/rsc/menu_icons/bowl.avif" },
        { id: 2, name: "Plate", maxEntrees: 2, price: 8.90, imageURL: "/rsc/menu_icons/plate.avif" },
        { id: 3, name: "Bigger Plate", maxEntrees: 3, price: 10.00, imageURL: "/rsc/menu_icons/biggerplate.avif" },
        { id: 4, name: "A La Carte", maxEntrees: 1, price: 4.00, imageURL: "/rsc/menu_icons/alacarte.avif" }
    ]);

    const [sides, setSides] = useState([
        { id: 1, name: "White Rice", imageURL: "/rsc/menu_icons/whiterice.webp" },
        { id: 2, name: "Fried Rice", imageURL: "/rsc/menu_icons/friedrice.webp" },
        { id: 3, name: "Chow Mein", imageURL: "/rsc/menu_icons/chowmein.webp" },
        { id: 4, name: "Super Greens", imageURL: "/rsc/menu_icons/supergreens.webp" },
    ]);

    const [entrees, setEntrees] = useState([
        { id: 1, name: "Beijing Beef", imageURL: "/rsc/menu_icons/beijing.webp" },
        { id: 2, name: "Broccoli Beef", imageURL: "/rsc/menu_icons/broccoli.webp" },
        { id: 3, name: "Black Pepper Angus Steak", imageURL: "/rsc/menu_icons/steak.webp" },
        { id: 4, name: "Black Pepper Chicken", imageURL: "/rsc/menu_icons/blackpepper.webp" },
        { id: 5, name: "Grilled Teriyaki Chicken", imageURL: "/rsc/menu_icons/teriyaki.webp" },
        { id: 6, name: "Honey Sesame Chicken Breast", imageURL: "/rsc/menu_icons/sesame.webp" },
        { id: 7, name: "Kung Pao Chicken", imageURL: "/rsc/menu_icons/kungpao.webp" },
        { id: 8, name: "Mushroom Chicken", imageURL: "/rsc/menu_icons/mushroom.webp" },
        { id: 9, name: "Orange Chicken", imageURL: "/rsc/menu_icons/orange.webp" },
        { id: 10, name: "Sweet Fire Chicken Breast", imageURL: "/rsc/menu_icons/sweetfire.jpg" },
        { id: 11, name: "String Bean Chicken Breast", imageURL: "/rsc/menu_icons/stringbean.jpg" },
        { id: 12, name: "Honey Walnut Shrimp", imageURL: "/rsc/menu_icons/walnut.webp" },
        // {id:13, name: "poop"}
    ]);

    const addMenuItem = (newItem) => {
        setMenuItems((prevItems) => [...prevItems, newItem]);
    };

    const removeMenuItem = (id) => {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem, entrees, sides, comboOptions }}>
            {children}
        </MenuContext.Provider>
    );
};
