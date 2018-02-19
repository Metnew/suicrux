// @flow
import enLocaleData from 'react-intl/locale-data/en'
import ruLocaleData from 'react-intl/locale-data/ru'
import ru from 'static/locals/ru'
import en from 'static/locals/en'

export const defaultLanguage = 'en'
export const supportedLanguages = ['en', 'ru']

const translations = {
	en, ru
}

export default (lang: string = defaultLanguage) => {
	const localeData = {
		en: enLocaleData,
		ru: ruLocaleData
	}
	return {
		lang,
		localeData: localeData[lang],
		locale: lang,
		messages: translations[lang]
	}
}
