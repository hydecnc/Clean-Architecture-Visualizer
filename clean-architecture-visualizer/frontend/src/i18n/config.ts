import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enChecker from './locales/en/checker.json';
import enHome from './locales/en/home.json';

i18n.use(initReactI18next).init({
  resources: { en: { checker: enChecker, home: enHome } },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;