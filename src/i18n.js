import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import localeEE from './locales/ee/translation.json';
import localeEN from './locales/en/translation.json';
import localeRU from './locales/ru/translation.json';

const resources = {
  en: {
    translation: localeEN,
  },
  ee: {
    translation: localeEE,
  },
  ru: {
    translation: localeRU,
  },
};

i18next
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      ns: ['translate'],
      keySeparator: false,
      react: {
        wait: true,
        useSuspense: false,
        bindI18n: 'languageChanged loaded',
        nsMode: 'default',
      },
    });

export default i18next;
