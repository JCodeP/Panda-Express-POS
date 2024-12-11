import React, { createContext, useContext, useEffect, useState } from "react";
/**
 * @author Zachary Williams
 * 
 * Integrates the menu with the database
 */
const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    /*const [menuItems, setMenuItems] = useState([
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
    ]);*/

    const [comboOptions, setComboOptions] = useState([
        { id: 1, item_name: "Bowl", maxEntrees: 1, price: 7.80, imageURL: "https://i.imgur.com/L4nkahG.png" },
        { id: 2, item_name: "Plate", maxEntrees: 2, price: 8.90, imageURL: "https://i.imgur.com/JkZ0zxo.png" },
        { id: 3, item_name: "Bigger Plate", maxEntrees: 3, price: 10.00, imageURL: "https://i.imgur.com/j42Ulmf.png" },
        { id: 4, item_name: "A La Carte", maxEntrees: 1, price: 4.00, imageURL: "https://i.imgur.com/mMWZbJW.png" }
    ]);
    const [menuItems, setMenuItems] = useState([]);
    const [appetizers, setAppetizers] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [sides, setSides] = useState([]);
    const [entrees, setEntrees] = useState([]);

    //puts the appetizers, drinks, and combos all in a list for cashier to use
    const fetchMenuData = async (setMenuItems) => {
        try {
            const response = await fetch('https://panda-webapp-deployment-3ro1.onrender.com/api/get-menu-context');
            const data = await response.json();
            setMenuItems(data);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    //gets the list of drinks from the database
    const fetchDrinkData = async (setDrinks) => {
        try {
            const response = await fetch('https://panda-webapp-deployment-3ro1.onrender.com/api/get-drink-context');
            const data = await response.json();
            setDrinks(data);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    //gets the list of appetizers from the database
    const fetchAppetizerData = async (setAppetizers) => {
        try {
            const response = await fetch('https://panda-webapp-deployment-3ro1.onrender.com/api/get-appetizer-context');
            const data = await response.json();
            setAppetizers(data);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
        console.log(appetizers);
    };

    //gets the list of entrees from the database
    const fetchEntreeData = async (setEntrees) => {
        console.log("Entered fetch Entree Data");
        try {
            const response = await fetch('https://panda-webapp-deployment-3ro1.onrender.com/api/get-entree-context');
            const data = await response.json();
            setEntrees(data);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    //gets the list of sides from the database
    const fetchSideData = async (setEntrees) => {
        try {
            const response = await fetch('https://panda-webapp-deployment-3ro1.onrender.com/api/get-side-context');
            const data = await response.json();
            setSides(data);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    //gets the list of sides at the beginning of the program
    useEffect(() => {
        fetchEntreeData(setEntrees);
        fetchSideData(setSides);
        fetchDrinkData(setDrinks);
        fetchAppetizerData(setAppetizers);
        fetchMenuData(setMenuItems);
    }, []);

    //adds a side from the menu
    const addSide = (newItem) => {
        setSides((prevItems) => [...prevItems, newItem]);
    }

    //removes a side from the menu
    const removeSide = (item_name) => {
        setSides((prevItems) => prevItems.filter((item) => item.item_name !== item_name));
    };

    //adds a drink from the menu
    const addDrink = (newItem) => {
        setDrinks((prevItems) => [...prevItems, newItem]);
    }

    //removes a drink from the menu
    const removeDrink = (item_name) => {
        setDrinks((prevItems) => prevItems.filter((item) => item.item_name !== item_name));
    };

    //adds an appetizer from the menu
    const addAppetizer = (newItem) => {
        setAppetizers((prevItems) => [...prevItems, newItem]);
    }

    //removes an appetizer from the menu
    const removeAppetizer = (item_name) => {
        setAppetizers((prevItems) => prevItems.filter((item) => item.item_name !== item_name));
    };

    //changes the price of an appetizer
    const changeAppetizerPrice = (item_name, new_price) => {
        setAppetizers((prevItems) =>
            prevItems.map((item) =>
                item.item_name === item_name
                    ? { ...item, price: parseFloat(new_price) } // Update the price for the matching item
                    : item // Keep other items unchanged
            )
        );
        changeMenuPrice(item_name, new_price);
        changeDrinkPrice(item_name, new_price);
    };

    //changes the price of a drink
    const changeDrinkPrice = (item_name, new_price) => {
        setDrinks((prevItems) =>
            prevItems.map((item) =>
                item.item_name === item_name
                    ? { ...item, price: parseFloat(new_price) } // Update the price for the matching item
                    : item // Keep other items unchanged
            )
        );
    };

    //changes the price in the menu list
    const changeMenuPrice = (item_name, new_price) => {
        setMenuItems((prevItems) =>
            prevItems.map((item) =>
                item.item_name === item_name
                    ? { ...item, price: parseFloat(new_price) } // Update the price for the matching item
                    : item // Keep other items unchanged
            )
        );
    };

    //adds an entree to the menu
    const addEntree = (newItem) => {
        console.log('entered add');
        setEntrees((prevItems) => [...prevItems, newItem]);
        console.log(entrees);
    }

    //removes an entree from the menu
    const removeEntree = (item_name) => {
        console.log('entered remove');
        setEntrees((prevItems) => prevItems.filter((item) => item.item_name !== item_name));
    };

    // Log updated entrees using useEffect
    useEffect(() => {
        console.log('Updated entrees:', entrees);
    }, [entrees]);  // This ensures it logs whenever `entrees` changes

    //adds and item to the menu list
    const addMenuItem = (newItem) => {
        setMenuItems((prevItems) => [...prevItems, newItem]);
        console.log(menuItems);
    };

    //removes an item from the menu list
    const removeMenuItem = (item_name) => {
        setMenuItems((prevItems) => prevItems.filter((item) => item.item_name !== item_name));
    };

    return (
        <MenuContext.Provider value={{ menuItems, addDrink, addAppetizer, removeAppetizer, changeAppetizerPrice, removeDrink, addSide, removeSide, addEntree, removeEntree, addMenuItem, removeMenuItem, fetchEntreeData, entrees, sides, comboOptions, appetizers, drinks }}>
            {children}
        </MenuContext.Provider>
    );
};
