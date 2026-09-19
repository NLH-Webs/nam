import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { vi } from './locales/vi';

// Helper to get browser language
const getBrowserLanguage = () => {
    const language = navigator.language || (navigator as any).userLanguage;
    return language.startsWith('vi') ? 'vi' : 'en'; // Default to English if not Vietnamese
};

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            vi: { translation: vi }
        },
        lng: 'vi', // Default to Vietnamese for now, or use getBrowserLanguage()
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

// Keep <html lang> in sync so the shared lead form (<nlh-contact>) switches language with the page.
const syncHtmlLang = (lng: string) => { document.documentElement.lang = lng.startsWith('en') ? 'en' : 'vi'; };
syncHtmlLang(i18n.language || 'vi');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
