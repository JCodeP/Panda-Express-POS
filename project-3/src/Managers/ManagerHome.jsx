import React from 'react';
import { Link,  Routes, Route, Outlet } from 'react-router-dom'; // Import Link for navigation
import ManagerNavBar from './ManagerNavBar';
import EmployeePage from './EmployeePage';
import HistoryGraphs from './HistoryGraphs';
import InventoryPage from './InventoryPage';
import CreateOrderPage from './CreateOrderPage';
import ManageMenu from './ManageMenu'

function ManagerHome() {
    return (
        
        <div>
            <Routes>
                <Route path="/" element={<ManagerNavBar/>}/>
                <Route path="employeepage" element={<EmployeePage />} />
                <Route path="historygraphs" element={<HistoryGraphs />} />
                <Route path="inventorypage" element={<InventoryPage />} />
                <Route path="createorderpage" element={<CreateOrderPage />} />
                <Route path="managemenu" element={<ManageMenu/>}/>
            </Routes>
            
            {/* Outlet renders the matching child route component */}
            <Outlet />
            
            
        </div>
    
        
    );
}

export default ManagerHome