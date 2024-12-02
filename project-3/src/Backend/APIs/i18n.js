import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    begin: 'Touch Here To Begin',
                    order: 'Orders'
                }
            },

            es: {
                translation: {
                    begin: 'poopy butthole',
                    order: 'poop'
                }
            }
        }
    })