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

    const addMenuItem = (newItem) => {
        setMenuItems((prevItems) => [...prevItems, newItem]);
    };

    const removeMenuItem = (id) => {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
            {children}
        </MenuContext.Provider>
    );
};
