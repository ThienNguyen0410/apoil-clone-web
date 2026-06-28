import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import vi from './vi/translation.json';
import en from './en/translation.json';

const resources = {
    vi: {
        translation: vi
    },
    en: {
        translation: en
    }
}

let initLang = 'vi';
try {
    const persisted = localStorage.getItem('persist:root');
    if (persisted) {
        const parsed = JSON.parse(persisted);
        if (parsed.locale) {
            const localeState = JSON.parse(parsed.locale);
            if (localeState.language === 'ENG') {
                initLang = 'en';
            }
        }
    }
}
catch(error) {console.error('Error initializing i18n:', error);}



i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
})

export default i18n;