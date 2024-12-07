import React, { useState, useEffect } from "react";
import "./Customer.css";

function Tran({ word, lang }) {
    const [translation, setTranslation] = useState("");
    const [error, setError] = useState(null);

    const fetchTranslation = async () => {
        try {
            let response = await fetch(`http://localhost:5001/api/translate/${lang}/${word}`);
            if (!response.ok) {
                //if GET fails; PUT into json
                response = await fetch(`http://localhost:5001/api/translate/${lang}/${word}`, { method: "PUT" });
                if (!response.ok) {
                    throw new Error("Translation failed");
                }
                fetchTranslation();
            }
            const text = await response.text();
            setTranslation(text);
        } catch (err) {
            setError(err.message);
        }
    };

    //to ensure changes to word or language are adjusted
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

