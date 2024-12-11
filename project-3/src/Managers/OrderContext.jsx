import React, { createContext, useEffect, useState } from 'react';

//context used for table in inventory order
export const OrderContext = createContext();

/**
 * 
 * @author Joshua Park
 * This is using react context for the table inventory in the inventory order page in manager.
 * This defines functions to use for the inventory page.
 */
export const OrderProvider = ({ children }) => {
    const [orderData, setOrderData] = useState(() => {
        const savedOrder = localStorage.getItem('orderData');
        return savedOrder ? JSON.parse(savedOrder) : [];
    });

    const clear = () => {
      setOrderData([]);
    }


    //listens for when inventory page is opened to send data
    useEffect(() => {
        localStorage.setItem('orderData', JSON.stringify(orderData));

    }, [orderData]);
  
    // Function to add data to the table
    const addRow = (newRow) => {
      setOrderData((prevOrder) => [...prevOrder, newRow]);
    };
    //function to delete a item from inventory order
    const deleteRow = (index) => {
        const updatedOrder = orderData.filter((row, i) => i !== index);
        setOrderData(updatedOrder);
    };
    //function to edit a quantity in inventory order
    const editRow = (index, colName, value) => {
      if (/^(?!0(\.0+)?$)0\d+/.test(value)) {
        
        return;
      } 
      if (/(\.\d+|\d+\.)/.test(value)) {
        
        return;
      }
      if (/[^0-9]/.test(value)) {
  
        return;
        
      }
      setOrderData((prevData) => 
        prevData.map((row, i) => 
          i === index ? {...row, [colName]: value} : row
        )
    
      );
    };
    //function to update cost of an item after a change made
    const updateRowCost = (index, updatedCost) => {
      setOrderData((prevData) => 
        prevData.map((row, i) =>
          i === index ? {...row, cost: updatedCost} : row
        )
      );
    };
  
    return (
      <OrderContext.Provider value={{ orderData, addRow, deleteRow, editRow, updateRowCost, clear }}>
        {children}
      </OrderContext.Provider>
    );
};