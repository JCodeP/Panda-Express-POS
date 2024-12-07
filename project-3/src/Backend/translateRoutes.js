import express from 'express'
import enTranslation from './Locales/en/translation.json' assert { type: "json" };
import bodyParser from "body-parser";



const translateRouter = express.Router();

translateRouter.use(bodyParser.json());

translateRouter.get("/en", (req, res) => {
    res.json(enTranslation);
})

translateRouter.get("/en/:word", (req, res) => {
    console.log("attempting GET");
    const word = req.params.word;
    const translation = enTranslation[word];
    if (translation) {
        res.send(translation);
    }
    else {
        res.status(404).json({ error: "Translation not found" });
    }
})

translateRouter.put("/en/:word", (req, res) => {
    console.log("attempting PUT");
    const word = req.params.word; // Get the word from the URL parameters

    enTranslation[word] = word;

    res.json({
        message: `Translation for '${word}' has been updated.`,
        word,
    });
})

export default translateRouter;
