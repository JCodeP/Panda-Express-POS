import React, { createContext, useContext, useEffect, useState } from "react";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([
        { id: 1, item_name: "Bowl", price: 7.80, category: "Combos" },
        { id: 2, item_name: "Plate", price: 8.90, category: "Combos" },
        { id: 3, item_name: "Bigger Plate", price: 10.00, category: "Combos" },
        { id: 4, item_name: "A La Carte", price: 4.00, category: "Combos" },
        { id: 5, item_name: "Egg Roll", price: 1.99, category: "Appetizers" },
        { id: 6, item_name: "Spring Roll", price: 1.99, category: "Appetizers" },
        { id: 7, item_name: "Cream Cheese Rangoon", price: 1.99, category: "Appetizers" },
        { id: 8, item_name: "Apple Pie Egg Roll", price: 1.99, category: "Appetizers" },
        { id: 9, item_name: "Small Drink", price: 1.99, category: "Drinks" },
        { id: 10, item_name: "Medium Drink", price: 2.29, category: "Drinks" },
        { id: 11, item_name: "Large Drink", price: 2.59, category: "Drinks" },
        { id: 12, item_name: "Water Bottle", price: 1.99, category: "Drinks" },
    ]);

    /*const [appetizers, setAppetizers] = useState([
        { id: 5, name: "Egg Roll", price: 1.99, category: "Appetizers", imageURL: "https://i.imgur.com/Ah9KkZA.png" },
        { id: 6, name: "Spring Roll", price: 1.99, category: "Appetizers", imageURL: "https://i.imgur.com/KMa6KVU.png" },
        { id: 7, name: "Cream Cheese Rangoon", price: 1.99, category: "Appetizers", imageURL: "https://i.imgur.com/wZTyu3W.png" },
        { id: 8, name: "Apple Pie Egg Roll", price: 1.99, category: "Appetizers", imageURL: "https://i.imgur.com/RyGK27Y.jpeg" },
        // { id: 9, name: "Poop", price: 1.99, category: "Appetizers", imageURL: "https://placehold.co/75x75" },
    ]);*/

    /*const [drinks, setDrinks] = useState([
        { id: 9, name: "Small Drink", price: 1.99, category: "Drinks", imageURL: "https://i.imgur.com/ufrbISK.jpeg" },
        { id: 10, name: "Medium Drink", price: 2.29, category: "Drinks", imageURL: "https://i.imgur.com/ufrbISK.jpeg" },
        { id: 11, name: "Large Drink", price: 2.59, category: "Drinks", imageURL: "https://i.imgur.com/ufrbISK.jpeg" },
        { id: 12, name: "Water Bottle", price: 1.99, category: "Drinks", imageURL: "https://pngimg.com/uploads/water_bottle/water_bottle_PNG10169.png" },
        // { id: 13, name: "Poop", price: 1.99, category: "Appetizers", imageURL: "https://placehold.co/75x75" },
    ]);*/

    const [comboOptions, setComboOptions] = useState([
        { id: 1, name: "Bowl", maxEntrees: 1, price: 7.80, imageURL: "https://i.imgur.com/L4nkahG.png" },
        { id: 2, name: "Plate", maxEntrees: 2, price: 8.90, imageURL: "https://i.imgur.com/JkZ0zxo.png" },
        { id: 3, name: "Bigger Plate", maxEntrees: 3, price: 10.00, imageURL: "https://i.imgur.com/j42Ulmf.png" },
        { id: 4, name: "A La Carte", maxEntrees: 1, price: 4.00, imageURL: "https://i.imgur.com/mMWZbJW.png" }
    ]);
    const [appetizers, setAppetizers] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [sides, setSides] = useState([]);
    const [entrees, setEntrees] = useState([]);

    const fetchDrinkData = async (setDrinks) => {
        try {
            const response = await fetch('http://localhost:5001/api/get-drink-context');
            const data = await response.json();
            setDrinks(data);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    const fetchAppetizerData = async (setAppetizers) => {
        try {
            const response = await fetch('http://localhost:5001/api/get-appetizer-context');
            const data = await response.json();
            setAppetizers(data);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
        console.log(appetizers);
    };

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

    const fetchSideData = async (setEntrees) => {
        try {
            const response = await fetch('http://localhost:5001/api/get-side-context');
            const data = await response.json();
            setSides(data);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    useEffect(()=>{
        fetchEntreeData(setEntrees);
        fetchSideData(setSides);
        fetchDrinkData(setDrinks);
        fetchAppetizerData(setAppetizers);
    },[]);

    const addSide = (newItem) => {
        setSides((prevItems) => [...prevItems, newItem]);
    }

    const removeSide = (item_name) => {
        setSides((prevItems) => prevItems.filter((item) => item.item_name !== item_name));
    };

    const addDrink = (newItem) => {
        setDrinks((prevItems) => [...prevItems, newItem]);
    }

    const removeDrink = (item_name) => {
        setDrinks((prevItems) => prevItems.filter((item) => item.item_name !== item_name));
    };

    const addAppetizer = (newItem) => {
        setAppetizers((prevItems) => [...prevItems, newItem]);
    }

    const removeAppetizer = (item_name) => {
        setAppetizers((prevItems) => prevItems.filter((item) => item.item_name !== item_name));
    };

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
        <MenuContext.Provider value={{ menuItems,addDrink,addAppetizer,removeAppetizer, removeDrink, addSide, removeSide, addEntree, removeEntree, addMenuItem, removeMenuItem, fetchEntreeData, entrees, sides, comboOptions, appetizers, drinks }}>
            {children}
        </MenuContext.Provider>
    );
};
