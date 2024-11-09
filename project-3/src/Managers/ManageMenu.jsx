import React from 'react';
import './ManageMenu.css';

function ManageMenu() {
    const foodItems = [
        { name: 'Egg Roll', price: '$10' },
        { name: 'Small Drink', price: '$12' },
        { name: 'Medium Drink', price: '$8' },     
    ];

    const menuItems = [
        {name: 'Bowl', price: '$7.50'},
        {name: 'Plate', price: '$10.50'},
        {name: 'Bigger Plate', price: '$11.50'},
    ];

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
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="button-group">
                        <button>Add Item</button>
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
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
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
        </div>
    );
}

export default ManageMenu;
