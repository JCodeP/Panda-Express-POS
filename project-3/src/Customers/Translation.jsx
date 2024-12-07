// import React, { useState } from "react";

// function Tran(word) {
//     const [translation, setTranslation] = useState(""); // State for the translation
//     const [error, setError] = useState(null); // State for errors

//     const fetchTranslation = async () => {
//         const response = await fetch(`http://localhost:5001/api/translate/en/${word}`);
//         if (!response.ok) {
//             const response2 = await fetch(`http://localhost:5001/api/translate/en/${word}`, {method: "PUT" });
//             if (!response2.ok) {
//                 return "Translation failed";
//             }
//             return fetchTranslation;
//         }
//         const text = await response.text();
//         return text;
            
//     };

//     return (
//         <div>
//             {fetchTranslation}
//         </div>
//     );
// }

// export default Tran;

import React, { useState, useEffect } from "react";

function Tran({ word }) {
    const [translation, setTranslation] = useState(""); // State for the translation
    const [error, setError] = useState(null); // State for errors

    const fetchTranslation = async () => {
        try {
            let response = await fetch(`http://localhost:5001/api/translate/en/${word}`);
            if (!response.ok) {
                // If the GET request fails, try the PUT request
                response = await fetch(`http://localhost:5001/api/translate/en/${word}`, { method: "PUT" });
                if (!response.ok) {
                    throw new Error("Translation failed");
                }
                fetchTranslation();
            }
            const text = await response.text();
            setTranslation(text); // Update the state with the translation
        } catch (err) {
            setError(err.message); // Handle errors
        }
    };

    // Use useEffect to fetch data when the component mounts or `word` changes
    useEffect(() => {
        fetchTranslation();
    }, [word]);

    return (
        <div>
            {error ? (
                <p style={{ color: "red" }}>Error: {error}</p>
            ) : (
                <p>{translation || "Loading..."}</p>
            )}
        </div>
    );
}

export default Tran;

