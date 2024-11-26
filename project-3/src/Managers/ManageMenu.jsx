import React, { useState, useEffect } from 'react';
import './ManageMenu.css';

function ManageMenu() {
    console.log('ManageMenu component rendered'); 
    const [foodItems, setFoodItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Controls popup visibility
    const [newItemName, setNewItemName] = useState(''); // Stores the input value
    const [errorMessage, setErrorMessage] = useState(''); // Error message for submission

    // Fetch food data
    useEffect(() => {
        const fetchFoodData = async () => {
            console.log('requesting foodData');
            try {
                const response = await fetch('http://localhost:5001/api/get-food-data');
                const data = await response.json();
                console.log('Fetched food data:', data); 
                setFoodItems(data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };
    
        fetchFoodData();
    }, []);
    
    // Fetch menu data
    useEffect(() => {
        const fetchMenuData = async () => {
            console.log('requesting menuData');
            try {
                const response = await fetch('http://localhost:5001/api/get-menu-data');
                const data = await response.json();
                console.log('Fetched menu data:', data); 
                setMenuItems(data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };
    
        fetchMenuData();
    }, []);

    // Function to handle adding a new entree
    const handleAddEntree = async () => {
        if (!newItemName) {
            setErrorMessage('Item name cannot be empty');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/add-entree', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_name: newItemName }),
            });

            if (response.ok) {
                const addedItem = await response.json();
                console.log('Added item:', addedItem);
                setFoodItems([...foodItems, addedItem]); // Update foodItems with new item
                setIsPopupOpen(false); // Close popup
                setNewItemName(''); // Reset input
                setErrorMessage(''); // Clear error
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to add item');
            }
        } catch (error) {
            console.error('Error adding entree:', error);
            setErrorMessage('An unexpected error occurred');
        }
    };

    return (
        <div className="create-order-page">
            <h1>Manage Menu</h1>
            <div className="table-container-wrapper">
                {/* First Table */}
                <div className="table-container">
                    <h2>Food Items</h2>
                    <table className="food-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.item_name}</td>
                                    <td>{item.is_prem !== undefined ? item.is_prem.toString() : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="button-group">
                        <button onClick={() => setIsPopupOpen(true)}>Add Item</button>
                        <button>Change Premium</button>
                        <button>Delete Item</button>
                    </div>
                </div>

                {/* Second Table */}
                <div className="table-container">
                    <h2>Menu Items</h2>
                    <table className="food-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.item_name}</td>
                                    <td>{item.price || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="button-group">
                        <button>Add Item</button>
                        <button>Change Price</button>
                        <button>Delete Item</button>
                    </div>
                </div>
            </div>

            {/* Popup */}
            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Add New Food Item</h3>
                        <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            placeholder="Enter item name"
                        />
                        <div className="popup-buttons">
                            <button onClick={handleAddEntree}>Submit</button>
                            <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageMenu;
