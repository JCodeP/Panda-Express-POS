import express from 'express'
// import enTranslation from './Locales/en/translation.json' assert { type: "json" };
// const enTranslation = await import('./Locales/en/translation.json');

// import esTranslation from './Locales/es/translation.json' assert { type: "json" };
// const esTranslation = await import('./Locales/es/translation.json');

import fs from 'fs/promises';
import path from 'path';


const enFilePath = path.resolve('./Locales/en/translation.json');
const esFilePath = path.resolve('./Locales/es/translation.json');


    const enTranslation = JSON.parse(await fs.readFile(enFilePath, 'utf8')); 
    const esTranslation = JSON.parse(await fs.readFile(esFilePath, 'utf8')); 
    console.log('Translations loaded:');




import bodyParser from "body-parser";

const translateRouter = express.Router();

translateRouter.use(bodyParser.json());

translateRouter.get("/en", (req, res) => {
    res.json(enTranslation);
})

translateRouter.get("/en/:word", (req, res) => {
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
    const word = req.params.word;
    const translation = esTranslation[word];
    if (translation) {
        res.send(translation);
    }
    else {
        res.status(404).json({ error: "Translation not found" });
    }
})

translateRouter.put("/en/:word", (req, res) => {;
    const word = req.params.word;

    enTranslation[word] = word;

    res.json({
        message: `Translation for '${word}' has been updated.`,
        word,
    });
})

translateRouter.put("/es/:word", async (req, res) => {

    const word = req.params.word; 

    try {
        //fetch from google
        const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${process.env.translateApiKey}&source=en&target=es&q=${word}`
        );

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const jsonResponse = await response.json();

        //validate json
        if (!jsonResponse?.data?.translations || jsonResponse.data.translations.length === 0) {
            throw new Error("Invalid API response: No translations found.");
        }

        const translatedText = jsonResponse.data.translations[0].translatedText;

        esTranslation[word] = translatedText;

        res.json({
            message: `Translation for '${word}' has been updated.`,
            word,
            translation: translatedText,
        });
    } catch (error) {
        console.error("Error during translation:", error.message);

        res.status(500).json({
            error: "Failed to update translation.",
            details: error.message,
        });
    }
});

export default translateRouter;
