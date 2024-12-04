import React, { createContext, useEffect, useState } from 'react';


export const OrderContext = createContext();


export const OrderProvider = ({ children }) => {
    const [orderData, setOrderData] = useState(() => {
        const savedOrder = localStorage.getItem('orderData');
        return savedOrder ? JSON.parse(savedOrder) : [];
    });



    useEffect(() => {
        localStorage.setItem('orderData', JSON.stringify(orderData));

    }, [orderData]);
  
    // Function to add data to the table
    const addRow = (newRow) => {
      setOrderData((prevOrder) => [...prevOrder, newRow]);
    };

    const deleteRow = (name) => {
        const updatedOrder = orderData.filter(row => row.name !== name);
        setOrderData(updatedOrder);
    };

    const editRow = (index, colName, value) => {
      setOrderData((prevData) => 
        prevData.map((row, i) => 
          i === index ? {...row, [colName]: value} : row
        )
    
      );
    };

    const updateRowCost = (index, updatedCost) => {
      setOrderData((prevData) => 
        prevData.map((row, i) =>
          i === index ? {...row, cost: updatedCost} : row
        )
      );
    };
  
    return (
      <OrderContext.Provider value={{ orderData, addRow, deleteRow, editRow, updateRowCost }}>
        {children}
      </OrderContext.Provider>
    );
};