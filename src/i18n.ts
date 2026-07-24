import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import zh from './locales/zh.json'

const saved = localStorage.getItem('loop-lang') || 'en'

i18n.use(initReactI18next).init({
  lng: saved,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('loop-lang', lng)
})

export default i18n
