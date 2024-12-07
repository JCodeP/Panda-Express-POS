import React, { useState, useEffect } from "react";
import "./Customer.css";

function Tran({ word, lang }) {
    const [translation, setTranslation] = useState(""); // State for the translation
    const [error, setError] = useState(null); // State for errors

    const fetchTranslation = async () => {
        try {
            let response = await fetch(`http://localhost:5001/api/translate/${lang}/${word}`);
            if (!response.ok) {
                // If the GET request fails, try the PUT request
                response = await fetch(`http://localhost:5001/api/translate/${lang}/${word}`, { method: "PUT" });
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
    }, [word, lang]);

    return (
        <>
            {error ? (
                <p style={{ color: "red" }}>Error: {error}</p>
            ) : (
                <>{translation || "Loading..."}</>
            )}
        </>
    );
}

export default Tran;

