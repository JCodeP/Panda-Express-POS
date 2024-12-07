import React from "react";
import "./Customer.css";
import {useNavigate} from "react-router-dom";
import Tran from "./Translation.jsx"


function Welcome({language, changeLanguage}) {

    const navigate = useNavigate();

    const redirect = () => {
        navigate("../menu");
    }

    return(
        <div className="translate-container">
            <div className = "ellipse" onClick = {redirect}>
                <Tran word="Touch Here To Begin" lang={language} />
            
            </div>
            <div>
                    <button className="translate-button" onClick={() => changeLanguage()}>
                        <Tran word="Change Language" lang={language} />
                    </button>
            </div>
        </div>
        
    );
}

export default Welcome;