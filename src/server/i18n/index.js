// @flow
import {readFileSync} from 'fs' // readFile
import path from 'path'
import {sync as globSync} from 'glob'
import enLocaleData from 'react-intl/locale-data/en'
import ruLocaleData from 'react-intl/locale-data/ru'

const getTranslations = () => {
	return globSync('locals/*.json')
		.map((filename: string) => [
			path.basename(filename, '.json'),
			readFileSync(filename, 'utf8')
		])
		.map(([locale, file]) => [locale, JSON.parse(file)])
		.reduce((acc, [locale, messages]) => {
			return {
				...acc,
				[locale]: messages
			}
		}, {})
}

export const defaultLanguage = 'en'
export const supportedLanguages = ['en', 'ru']

export default (lang: string = defaultLanguage) => {
	const translations = getTranslations()
	const summaryLocaleData = {
		en: enLocaleData,
		ru: ruLocaleData
	}
	return {
		lang,
		localeData: summaryLocaleData[lang],
		locale: lang,
		messages: translations[lang]
	}
}
