import express from 'express'
import enTranslation from './Locales/en/translation.json' assert { type: "json" };
import bodyParser from body-parser;



const translateRouter = express.Router();

translateRouter.use(bodyParser.json());

translateRouter.get("/en", (req, res) => {
    res.json(enTranslation);
})

translateRouter.get("/en/:word", (req, res) => {
    const word = req.params.word;
    const translation = enTranslation[word];
    if (translation) {
        res.json({ word, translation });
    }
    else {
        res.status(404).json({ error: "Translation not found" });
    }
})

translateRouter.put("/en/:word", (req, res) => {
    const word = req.params.word; // Get the word from the URL parameters
    const newTranslation = req.body.translation; // Get the new translation from the request body

    if (!newTranslation) {
        return res.status(400).json({ error: "Translation is required" }); // Handle missing translation
    }

    enTranslation[word] = newTranslation; // Update or create the translation for the word

    res.json({
        message: `Translation for '${word}' has been updated.`,
        word,
        translation: newTranslation,
    });
})

export default translateRouter;
