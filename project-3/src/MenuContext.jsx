import React, { createContext, useContext, useEffect, useState } from "react";

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

    const [appetizers, setAppetizers] = useState([
        { id: 5, name: "Egg Roll", price: 1.99, category: "Appetizers", imageURL: "https://i.imgur.com/Ah9KkZA.png" },
        { id: 6, name: "Spring Roll", price: 1.99, category: "Appetizers", imageURL: "https://i.imgur.com/KMa6KVU.png" },
        { id: 7, name: "Cream Cheese Rangoon", price: 1.99, category: "Appetizers", imageURL: "https://i.imgur.com/wZTyu3W.png" },
        { id: 8, name: "Apple Pie Egg Roll", price: 1.99, category: "Appetizers", imageURL: "https://i.imgur.com/RyGK27Y.jpeg" },
        // { id: 9, name: "Poop", price: 1.99, category: "Appetizers", imageURL: "https://placehold.co/75x75" },
    ]);

    const [drinks, setDrinks] = useState([
        { id: 9, name: "Small Drink", price: 1.99, category: "Drinks", imageURL: "https://i.imgur.com/ufrbISK.jpeg" },
        { id: 10, name: "Medium Drink", price: 2.29, category: "Drinks", imageURL: "https://i.imgur.com/ufrbISK.jpeg" },
        { id: 11, name: "Large Drink", price: 2.59, category: "Drinks", imageURL: "https://i.imgur.com/ufrbISK.jpeg" },
        { id: 12, name: "Water Bottle", price: 1.99, category: "Drinks", imageURL: "https://pngimg.com/uploads/water_bottle/water_bottle_PNG10169.png" },
        // { id: 13, name: "Poop", price: 1.99, category: "Appetizers", imageURL: "https://placehold.co/75x75" },
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

    const [entrees, setEntrees] = useState([]);

    const fetchEntreeData = async (setEntrees) => {
        console.log("Entered fetch Entree Data");
        try {
            const response = await fetch('http://localhost:5001/api/get-entree-context');
            const data = await response.json();
            setEntrees(data);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    useEffect(()=>{
        fetchEntreeData(setEntrees);
    },[]);

    const addEntree = (newItem) => {
        console.log('entered add');
        setEntrees((prevItems) => [...prevItems, newItem]);
        console.log(entrees);
    }

    const removeEntree = (item_name) => {
        console.log('entered remove');
        setEntrees((prevItems) => prevItems.filter((item) => item.item_name !== item_name));
    };
    
    // Log updated entrees using useEffect
    useEffect(() => {
        console.log('Updated entrees:', entrees);
    }, [entrees]);  // This ensures it logs whenever `entrees` changes
    

    const addMenuItem = (newItem) => {
        setMenuItems((prevItems) => [...prevItems, newItem]);
    };

    const removeMenuItem = (id) => {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <MenuContext.Provider value={{ menuItems,addEntree, removeEntree, addMenuItem, removeMenuItem, fetchEntreeData, entrees, sides, comboOptions, appetizers, drinks }}>
            {children}
        </MenuContext.Provider>
    );
};
