import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// const apiKey = 'bBt0e6IXaAXjTLILHtnExA';
// const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

const langDetectorOptions = {
	// order and from where user language should be detected
	order: ['localStorage', 'cookie', 'navigator'],

	// keys or params to lookup language from
	lookupCookie: 'locale',
	lookupLocalStorage: 'locale',

	// cache user language on
	caches: ['localStorage', 'cookie'],
	excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

	// only detect languages that are in the whitelist
	checkWhitelist: true,
};

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		ns: ['translation'],
		defaultNS: 'translation',
		supportedLngs: ['en', 'fr', 'de', 'es', 'da'],
		backend: {
			loadPath: `/locales/{{lng}}/{{ns}}.json`,
			// allowMultiLoading: true,
		},
		// debug: process.env.NODE_ENV === 'development',
		detection: langDetectorOptions,
		interpolation: {
			escapeValue: false,
		},
		react: { useSuspense: true },
	});

export default i18n;
