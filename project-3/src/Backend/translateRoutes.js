import express from 'express'
import enTranslation from './Locales/en/translation.json' assert { type: "json" };

const translateRouter = express.Router();



translateRouter.get("/en", (req, res) => {
    res.json(enTranslation);
})

export default translateRouter;
