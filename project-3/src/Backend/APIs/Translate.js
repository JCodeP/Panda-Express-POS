
async function tran(word, lang) {
    if(lang === "en") {
        fetch(`http://localhost:5001/api/translate/en/${word}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.text(); // Read the response as plain text
            })
            .then((translation) => {
                console.log(`The translation for "${word}" is: ${translation}`);
            })
            .catch((error) => {
                console.error("Failed to fetch translation:", error.message);
            });
    }
}