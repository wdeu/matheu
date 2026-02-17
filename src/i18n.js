import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationDE from './locales/de/translation.json';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationES from './locales/es/translation.json';
import translationIT from './locales/it/translation.json';
import translationPL from './locales/pl/translation.json';
import translationPT from './locales/pt/translation.json';
import translationUK from './locales/uk/translation.json';

// the translations
const savedLanguage = localStorage.getItem('language') || 'de';

const resources = {
  de: {
    translation: translationDE
  },
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  es: {
    translation: translationES
  },
  it: {
    translation: translationIT
  },
  pl: {
    translation: translationPL
  },
  pt: {
    translation: translationPT
  },
  uk: {
    translation: translationUK
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'de', // fallback language
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
