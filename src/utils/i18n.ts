import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
export const langs = ['en', 'fr'];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslation,
            },
            fr: {
                translation: frTranslation,
            },
        },
        lng: 'en',
        fallbackLng: 'en',
        detection: {
            order: ['navigator']
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
