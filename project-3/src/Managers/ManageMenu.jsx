import React, { useState, useEffect } from 'react';
import './ManageMenu.css';

function ManageMenu() {
    const [foodItems, setFoodItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // For adding items
    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [itemType, setItemType] = useState('entree');
    const [deletePopupOpen, setDeletePopupOpen] = useState(false); // For delete confirmation
    const [itemToDelete, setItemToDelete] = useState(null); // Store item for deletion
    const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
    const [isMenuDeletePopupOpen, setMenuDeletePopupOpen] = useState(false);

    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/get-food-data');
                const data = await response.json();
                setFoodItems(data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };

        const fetchMenuData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/get-menu-data');
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchFoodData();
        fetchMenuData();
    }, []);

    // Function to handle deletion
    const handleDeleteItem = async () => {
        if (!itemToDelete) {
            setErrorMessage('No item selected for deletion');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5001/api/delete-item', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_name: itemToDelete }),
            });
    
            if (response.ok) {
                const deletedItem = await response.json();
                console.log('Deleted item:', deletedItem);
    
                // Remove deleted item from foodItems state
                setFoodItems(foodItems.filter((item) => item.item_name !== itemToDelete));
                setDeletePopupOpen(false); // Close popup
                setItemToDelete(null);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            setErrorMessage('An unexpected error occurred');
        }
    };

    const handleMenuDeleteItem = async () => {
        if (!itemToDelete) {
            setErrorMessage('No item selected for deletion');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5001/api/delete-item', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_name: itemToDelete }),
            });
    
            if (response.ok) {
                const deletedItem = await response.json();
                console.log('Deleted item:', deletedItem);
    
                // Remove deleted item from menuItems state
                setMenuItems(menuItems.filter((item) => item.item_name !== itemToDelete));
                setMenuDeletePopupOpen(false); // Close popup
                setItemToDelete(null);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            setErrorMessage('An unexpected error occurred');
        }
    };

    const handleAddFoodItem = async () => {
        if (!newItemName.trim()) {
            setErrorMessage('Item name cannot be empty');
            return;
        }
    
        try {
            // Determine the correct endpoint based on itemType (entree or side)
            const endpoint = itemType === 'entree' ? 'http://localhost:5001/api/add-entree' : 'http://localhost:5001/api/add-side';
    
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_name: newItemName }),
            });
    
            if (response.ok) {
                const addedItem = await response.json();
                console.log('Added item:', addedItem);
    
                // Update the foodItems state with the newly added item
                setFoodItems([...foodItems, addedItem]);
    
                // Close the popup and reset the input
                setIsPopupOpen(false);
                setNewItemName('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to add item');
            }
        } catch (error) {
            console.error('Error adding item:', error);
            setErrorMessage('An unexpected error occurred');
        }
    };

    const handleAddMenuItem = async() => {
        if (!newItemName.trim() || !newItemPrice.trim()) {
            setErrorMessage('Item name or price cannot be empty');
            return;
        }

        try{
            const endpoint = itemType === 'appetizer' ? 'http://localhost:5001/api/add-appetizer' : 'http://localhost:5001/api/add-drink';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_name: newItemName, price: newItemPrice }),
            });
    
            if (response.ok) {
                const addedItem = await response.json();
                console.log('Added item:', addedItem);
    
                // Update the foodItems state with the newly added item
                setMenuItems([...menuItems, addedItem]);
    
                // Close the popup and reset the input
                setIsMenuPopupOpen(false);
                setNewItemName('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to add item');
            }

        } catch(err){
            console.error('Error adding item:', error);
            setErrorMessage('An unexpected error occurred');
        }
    }

    // Function to handle changing premium status
    const handleChangePremium = async (itemName) => {
        try {
            const response = await fetch('http://localhost:5001/api/change-premium', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_name: itemName }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Changed premium status:', result);
                
                // Update the foodItems state to reflect the change
                setFoodItems(foodItems.map((item) =>
                    item.item_name === itemName ? { ...item, is_prem: !item.is_prem } : item
                ));
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to change premium status');
            }
        } catch (error) {
            console.error('Error changing premium status:', error);
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.item_name}</td>
                                <td>{item.is_prem !== undefined ? item.is_prem.toString() : 'N/A'}</td>
                                <td>
                                    {/* Delete Item Button */}
                                    <button
                                        onClick={() => {
                                            setDeletePopupOpen(true); // Open delete popup
                                            setItemToDelete(item.item_name); // Store the specific item name
                                        }}
                                    >
                                        Delete Item
                                    </button>

                                    {/* Change Premium Button */}
                                    <button
                                        onClick={() => handleChangePremium(item.item_name)}
                                    >
                                        Change Premium
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add Item Button - Global Control */}
                <div className="button-group">
                    <button onClick={() => setIsPopupOpen(true)}>Add Item</button>
                </div>
            </div>

            {/* Second Table (Modified) */}
            <div className="table-container">
                <h2>Menu Items</h2>
                <table className="food-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Actions</th> {/* Added Actions column */}
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.item_name}</td>
                                <td>{item.price || 'N/A'}</td>
                                <td>
                                    {/* Delete Item Button */}
                                    <button
                                        onClick={() => {
                                            setMenuDeletePopupOpen(true); // Open delete popup
                                            setItemToDelete(item.item_name); // Store the specific item name
                                        }}
                                    >
                                        Delete Item
                                    </button>

                                    {/* Change Price Button */}
                                    <button>
                                        Change Price
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add Item Button - Same as in the left table */}
                <div className="button-group">
                    <button
                        onClick={()=>{
                            setIsMenuPopupOpen(true)
                        }}>
                        Add Item
                    </button>
                </div>
            </div>
        </div>


            {/* Popup for Adding Items */}
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
                        <div>
                            <label>Select Type: </label>
                            <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                                <option value="entree">Entree</option>
                                <option value="side">Side</option>
                            </select>
                        </div>
                        <div className="popup-buttons">
                            <button onClick={() => handleAddFoodItem()}>Submit</button>
                            <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            )}

            {/* Popup for Menu Items */}
            {isMenuPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Add New Menu Item</h3>
                        <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            placeholder="Enter item name"
                        />
                        <input
                            type="text"
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(e.target.value)}
                            placeholder="Enter item price"
                        />
                        <div>
                            <label>Select Type: </label>
                            <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                                <option value="appetizer">Appetizer</option>
                                <option value="drink">Drink</option>
                            </select>
                        </div>
                        <div className="popup-buttons">
                            <button onClick={() => handleAddMenuItem()}>Submit</button>
                            <button onClick={() => setIsMenuPopupOpen(false)}>Cancel</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            )}

            {/* Popup for Delete Confirmation */}
            {deletePopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this item?</p>
                        <div className="popup-buttons">
                            <button onClick={handleDeleteItem}>Yes, Delete</button>
                            <button
                                onClick={() => {
                                    setDeletePopupOpen(false);
                                    setItemToDelete(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            )}

            {/* Popup for Delete Confirmation */}
            {isMenuDeletePopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this item?</p>
                        <div className="popup-buttons">
                            <button onClick={handleMenuDeleteItem}>Yes, Delete</button>
                            <button
                                onClick={() => {
                                    setMenuDeletePopupOpen(false);
                                    setItemToDelete(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageMenu;
