import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

/**
 * @author Kade Lieder
 * 
 * Order contexts makes an order propagate throughout the cashier interface 
 */
export const CashierOrderProvider = ({ children }) => {
    const [order, setOrder] = useState([]);

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);