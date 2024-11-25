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
        { id: 1, name: "Bowl", maxEntrees: 1, price: 7.80, imageURL: "https://i.imgur.com/L4nkahG.png" },
        { id: 2, name: "Plate", maxEntrees: 2, price: 8.90, imageURL: "https://i.imgur.com/JkZ0zxo.png" },
        { id: 3, name: "Bigger Plate", maxEntrees: 3, price: 10.00, imageURL: "https://i.imgur.com/j42Ulmf.png" },
        { id: 4, name: "A La Carte", maxEntrees: 1, price: 4.00, imageURL: "https://i.imgur.com/mMWZbJW.png" }
    ]);

    const [sides, setSides] = useState([
        { id: 1, name: "White Rice", imageURL: "https://i.imgur.com/jOAR92e.png" },
        { id: 2, name: "Fried Rice", imageURL: "https://i.imgur.com/riymn3i.png" },
        { id: 3, name: "Chow Mein", imageURL: "https://i.imgur.com/o1JMHr0.png" },
        { id: 4, name: "Super Greens", imageURL: "https://i.imgur.com/QHWRw40.png" },
    ]);

    const [entrees, setEntrees] = useState([
        { id: 1, name: "Beijing Beef", imageURL: "https://i.imgur.com/nGs4uXa.png" },
        { id: 2, name: "Broccoli Beef", imageURL: "https://i.imgur.com/4ZwloQc.png" },
        { id: 3, name: "Black Pepper Angus Steak", imageURL: "https://i.imgur.com/x1dPPWf.png" },
        { id: 4, name: "Black Pepper Chicken", imageURL: "https://i.imgur.com/K1iPAOl.png" },
        { id: 5, name: "Grilled Teriyaki Chicken", imageURL: "https://i.imgur.com/zEPSr9C.png" },
        { id: 6, name: "Honey Sesame Chicken Breast", imageURL: "https://i.imgur.com/p8OLsll.png" },
        { id: 7, name: "Kung Pao Chicken", imageURL: "https://i.imgur.com/lcBELCI.png" },
        { id: 8, name: "Mushroom Chicken", imageURL: "https://i.imgur.com/kHSVkTe.png" },
        { id: 9, name: "Orange Chicken", imageURL: "https://i.imgur.com/6iVwEfs.png" },
        { id: 10, name: "Sweet Fire Chicken Breast", imageURL: "https://i.imgur.com/qQPCCeW.jpeg" },
        { id: 11, name: "String Bean Chicken Breast", imageURL: "https://i.imgur.com/YxcPkcd.jpeg" },
        { id: 12, name: "Honey Walnut Shrimp", imageURL: "https://i.imgur.com/9zZIa3I.png" },
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
