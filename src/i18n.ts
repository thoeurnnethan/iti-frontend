// src/i18n.ts
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import km from './locales/km.json';
import Utils from './shared/util';

const util = new Utils();

const messages = {
  en: en,
  km: km
};

const lang = util.getDataStorage('lang')

const i18n = createI18n({
  legacy: false,
  locale: lang || 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
});

export default i18n;
