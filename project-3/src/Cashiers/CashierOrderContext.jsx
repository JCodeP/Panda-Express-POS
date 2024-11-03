import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const CashierOrderProvider = ({ children }) => {
    const [order, setOrder] = useState([]);

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);