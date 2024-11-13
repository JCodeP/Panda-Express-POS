import React, { useEffect, useState } from 'react';

import './ManagerHome.css';
import './CreateOrderStyle.css'






function CreateOrderPage() {
    const sampleDataTwo = [
        { id: 1, name: 'Alice', age: 25, occupation: 'Engineer' },
        { id: 2, name: 'Bob', age: 30, occupation: 'Designer' },
        { id: 3, name: 'Charlie', age: 35, occupation: 'Teacher' },
        { id: 4, name: 'David', age: 40, occupation: 'Manager' },
        { id: 5, name: 'Eve', age: 22, occupation: 'Intern' },
        { id: 6, name: 'Frank', age: 28, occupation: 'Developer' },
        { id: 7, name: 'Grace', age: 32, occupation: 'Analyst' },
        { id: 8, name: 'Hannah', age: 29, occupation: 'Marketing' },
        { id: 9, name: 'Ivy', age: 31, occupation: 'Sales' },
        { id: 10, name: 'Jack', age: 26, occupation: 'Support' },
    ];
    
    const [dataTwo, setDataTwo] = useState([]);
    
    useEffect(() => {
        // Set to sampleData to see the table with data
        setDataTwo(sampleDataTwo); // You can set it to [] to test with no data
    }, []);
    
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
                        {dataTwo.length === 0 ? (
                            <div className="table-row-two">
                                <div className="table-cell-two" colSpan="3">No data available</div>
                            </div>
                        ) : (
                            dataTwo.map((row) => (
                                <div className="table-row-two" key={row.id}>
                                    <div className="table-cell-two">{row.id}</div>
                                    <div className="table-cell-two">{row.name}</div>
                                    <div className="table-cell-two">{row.email}</div>
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