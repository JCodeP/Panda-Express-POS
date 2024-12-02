import React, { useEffect, useState, useContext } from 'react';
import { OrderContext } from './OrderContext';


import './ManagerHome.css';
import './CreateOrderStyle.css'






function CreateOrderPage() {
    const {orderData} = useContext(OrderContext);
   
    
    return (
        <div className="CreateOrderContainer">
            <h1 className="create-order-header">Current Inventory Order</h1>
            <div className="body-container">
                <div className="tableContainerTwo">
                    <div className="table-header-two">
                        <div className="table-cell-two">Item</div>
                        <div className="table-cell-two">Quantity</div>
                        <div className="table-cell-two">Cost</div>
                    </div>
                    <div className="table-body-two">
                        {orderData.length === 0 ? (
                            <div className="table-row-two">
                                <div className="table-cell-two" colSpan="3">No data available</div>
                            </div>
                        ) : (
                            orderData.map((row) => (
                                <div className="table-row-two" key={row.name}>
                                    <div className="table-cell-two">{row.name}</div>
                                    <div className="table-cell-two">{row.quantity}</div>
                                    <div className="table-cell-two">{row.cost}</div>
                                    
                                </div>
                            ))
                        )}
                    </div>
                </div>
                
                <h1 className="edit-instructions"> Click on row to delete or adjust quantity</h1>
            </div>
            <button className="submit">Submit</button>

        </div>

    );
}


export default CreateOrderPage;