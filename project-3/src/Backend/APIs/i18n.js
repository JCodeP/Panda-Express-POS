import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import enTranslation from '../Locales/en/translation.json';
import esTranslation from '../Locales/es/translation.json';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: enTranslation
            },

            es: {
                translation: esTranslation
            }
        }
    })