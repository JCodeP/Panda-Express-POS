// import i18next from "i18next";
// import axios from "axios";
// import fs from "fs"; // For Node.js file system operations

// // Google Translate API Key
// const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

// // Translation JSON paths
// const EN_TRANSLATION_PATH = "../Locales/en/translation.json";
// const ES_TRANSLATION_PATH = "../Locales/es/translation.json";

// async function tran(key, t) {
//     lang = i18next.language

//     // Load translation files
//     const enTranslations = JSON.parse(fs.readFileSync(EN_TRANSLATION_PATH, "utf8"));
//     const targetPath = `../Locales/${lang}/translation.json`;
//     const targetTranslations = JSON.parse(fs.readFileSync(targetPath, "utf8"));

//     // Check if the key exists in English
//     if (!enTranslations[key]) {
//         enTranslations[key] = key; // Use the key itself as the default value
//         fs.writeFileSync(EN_TRANSLATION_PATH, JSON.stringify(enTranslations, null, 2), "utf8");
//     }

//     // Check if the key exists in the target language
//     if (!targetTranslations[key]) {
//         try {
//             const translatedValue = await fetchTranslation(key, lang);
//             targetTranslations[key] = translatedValue;
//             fs.writeFileSync(targetPath, JSON.stringify(targetTranslations, null, 2), "utf8");
//         } catch (error) {
//             console.error("Error fetching translation:", error);
//         }
//     }

//     // Return the translated string using i18next
//     return t(key);
// }

// async function fetchTranslation(text, targetLang) {
//     const url = "https://translation.googleapis.com/language/translate/v2";
//     const params = {
//         q: text,
//         target: targetLang,
//         key: GOOGLE_TRANSLATE_API_KEY,
//     };

//     const response = await axios.post(url, null, { params });
//     return response.data.data.translations[0].translatedText;
// }

// export default translate;