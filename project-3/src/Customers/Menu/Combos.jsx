import React from "react";
import "../Customer.css";
import {useNavigate} from "react-router-dom";
import { useMenu } from "../../MenuContext";

function Combos() {
    // const [showCombos, setShowCombos] = useState(true);
    // const chooseCombo = () => {
    //     setShowCombos(false); // Switch to showing entrees
    // };

    const { menuItems } = useMenu();
    const comboOptions = menuItems.filter(item => item.category === "Combos");
    const entreeOptions = menuItems.filter(item => item.category === "Entrees");

    return(
        <div className = "combo-box">
            {(
                comboOptions.map(combo => (
                <button className = "combo-button" key = {comboOptions.id}>
                    <img src="https://placehold.co/200x200" alt="placeholder" />
                    <div className="separator" />
                    <span>{combo.name}</span>
                </button>
            )))}
        </div>
        
    );
}

export default Combos;

// : (
//     entreeOptions.map(entree => (
//         <div
//             key={entree.id}
//             style={{
//                 padding: "1rem",
//                 borderBottom: "1px solid #ddd",
//                 textAlign: "center"
//             }}
//         >
//             {entree.name}
//         </div>
//     ))
// )