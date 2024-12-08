import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ManagerNavStyle.css';


function ManagerNavBar() {
    const navigate = useNavigate();
    return (
        
        <div className="manager-home">
            <h1 className="manager-home-heading">Manager Home</h1>
            <div className="box-container">
                <div className="box">
                    <Link to="/managers/employeepage" className="box-link">
                        <div className="box-content"> {/* New div for content */}
                            <img src="https://placehold.co/150x100" alt="placeholder" />
                            <h2>Employee Management</h2>
                        </div>
                    </Link>
                </div>
                <div className="box">
                    <Link to="/managers/managemenu" className="box-link">
                        <div className="box-content"> {/* New div for content */}
                            <img src="https://placehold.co/150x100" alt="placeholder" />
                            <h2>Manage Menu</h2>
                        </div>
                    </Link>
                </div>
                <div className="box">
                    <Link to="/managers/historygraphs" className="box-link">
                        <div className="box-content"> {/* New div for content */}
                            <img src="https://placehold.co/150x100" alt="placeholder" />
                            <h2>Item Order History</h2>
                        </div>
                    </Link>
                </div>
                <div className="box">
                    <Link to="/managers/inventorypage" className="box-link">
                        <div className="box-content"> {/* New div for content */}
                            <img src="https://placehold.co/150x100" alt="placeholder" />
                            <h2>Inventory</h2>
                        </div>
                    </Link>
                </div>
                <div className="box">
                    <Link to="/managers/managereports" className="box-link">
                        <div className="box-content"> {/* New div for content */}
                            <img src="https://placehold.co/150x100" alt="placeholder" />
                            <h2>Manager Reports</h2>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="manager-home-back-container">
                <button onClick={() => navigate('/')} className="manager-home-back">
                Back to Home Page
                </button>

            </div>
            
            
        </div>

    );

}


export default ManagerNavBar;