import express from 'express'
import enTranslation from './Locales/en/translation.json' assert { type: "json" };
import esTranslation from './Locales/es/translation.json' assert { type: "json" };
import bodyParser from "body-parser";
// import dotenv from 'dotenv';

// dotenv.config();

const translateRouter = express.Router();



translateRouter.use(bodyParser.json());

translateRouter.get("/en", (req, res) => {
    res.json(enTranslation);
})

translateRouter.get("/en/:word", (req, res) => {
    // console.log("attempting GET");
    const word = req.params.word;
    const translation = enTranslation[word];
    if (translation) {
        res.send(translation);
    }
    else {
        res.status(404).json({ error: "Translation not found" });
    }
})

translateRouter.get("/es/:word", (req, res) => {
    // console.log("attempting GET");
    // res.send("espanol");
    
    const word = req.params.word;
    const translation = esTranslation[word];
    if (translation) {
        res.send(translation);
    }
    else {
        res.status(404).json({ error: "Translation not found" });
    }
})

translateRouter.put("/en/:word", (req, res) => {
    // console.log("attempting PUT");
    const word = req.params.word; // Get the word from the URL parameters

    enTranslation[word] = word;

    res.json({
        message: `Translation for '${word}' has been updated.`,
        word,
    });
})

// translateRouter.put("/es/:word", (req, res) => {
//     console.log("attempting PUT");
//     const word = req.params.word; // Get the word from the URL parameters
//     response = fetch(`https://translation.googleapis.com/language/translate/v2?key=${process.env.translateAPIKey}&source=en&target=es&q=${word}`);
//     jsonResponse = response.json();
//     esTranslation[word] = jsonResponse.data.translations[0].translatedText;

//     res.json({
//         message: `Translation for '${word}' has been updated.`,
//         word,
//     });
// })

translateRouter.put("/es/:word", async (req, res) => {
    // console.log("Attempting PUT");

    const word = req.params.word; // Get the word from the URL parameters

    try {
        // Make the fetch request to Google Translate API
        // console.log(`https://translation.googleapis.com/language/translate/v2?key=${process.env.translateApiKey}&source=en&target=es&q=${word}`);
        const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${process.env.translateApiKey}&source=en&target=es&q=${word}`
        );

        // Check if the fetch response is successful
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        // Parse the JSON response
        const jsonResponse = await response.json();

        // Validate the structure of the JSON response
        if (!jsonResponse?.data?.translations || jsonResponse.data.translations.length === 0) {
            throw new Error("Invalid API response: No translations found.");
        }

        // Extract the translated text
        const translatedText = jsonResponse.data.translations[0].translatedText;

        // Save the translation to your in-memory storage
        esTranslation[word] = translatedText;

        // Respond with a success message
        res.json({
            message: `Translation for '${word}' has been updated.`,
            word,
            translation: translatedText,
        });
    } catch (error) {
        console.error("Error during translation:", error.message);

        // Respond with a 500 Internal Server Error and error message
        res.status(500).json({
            error: "Failed to update translation.",
            details: error.message,
        });
    }
});

export default translateRouter;
