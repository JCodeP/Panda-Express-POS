import React from 'react';
import { Link } from 'react-router-dom';
import "./SiteNavBar.css";

function SiteNavBar() {
    return (
        <div className="card-container">
            <Link to="/managers" className="card-link">
                <div className="card">
                    <img src="https://i.imgur.com/oTHUHSF.png" alt="placeholder" />
                    <h2>Managers</h2>
                </div>
            </Link>
            <Link to="/cashiers" className="card-link">
                <div className="card">
                    <img src="https://i.imgur.com/UJ3eT5d.png" alt="placeholder" />
                    <h2>Cashiers</h2>
                </div>
            </Link>
            <Link to="/customers" className="card-link">
                <div className="card">
                    <img src="https://i.imgur.com/wCAZXzG.png" />
                    <h2>Customers</h2>
                </div>
            </Link>
            <Link to="/menu" className="card-link">
                <div className="card">
                    <img src="https://i.imgur.com/LZ6CnVx.png" alt="placeholder" />
                    <h2>Menu Board</h2>
                </div>
            </Link>
        </div>
    );
}

export default SiteNavBar;