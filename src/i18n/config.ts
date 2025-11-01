import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import enCommon from './locales/en/common.json';
import enCategories from './locales/en/categories.json';
import enSpecials from './locales/en/specials.json';
import enTrust from './locales/en/trust.json';

// Import Hebrew translations
import heCommon from './locales/he/common.json';
import heCategories from './locales/he/categories.json';
import heSpecials from './locales/he/specials.json';
import heTrust from './locales/he/trust.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        categories: enCategories,
        specials: enSpecials,
        trust: enTrust,
      },
      he: {
        common: heCommon,
        categories: heCategories,
        specials: heSpecials,
        trust: heTrust,
      }
    },
    fallbackLng: 'he',
    defaultNS: 'common',
    ns: ['common', 'categories', 'specials', 'trust'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage']
    },
    debug: import.meta.env.DEV, // Log missing keys in development
    saveMissing: false,
    missingKeyHandler: (lngs, ns, key, fallbackValue) => {
      const msg = `[i18n missing] ${lngs?.[0]}/${ns}: ${key}`;
      if (import.meta.env.DEV) {
        console.error(msg);
      }
    },
  });

export default i18n;
