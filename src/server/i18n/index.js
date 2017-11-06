// @flow
import {readFileSync} from 'fs' // readFile
import path from 'path'
import {sync as globSync} from 'glob'
import chokidar from 'chokidar'
import enLocaleData from 'react-intl/locale-data/en'
import ruLocaleData from 'react-intl/locale-data/ru'
import type {i18nConfigObject} from 'types'

const getTranslations = () => {
	return globSync('locals/*.json')
		.map((filename: string) => [
			path.basename(filename, '.json'),
			readFileSync(filename, 'utf8')
		])
		.map(([locale, file]) => [locale, JSON.parse(file)])
		.reduce((acc, [locale, messages]) => {
			acc[locale] = messages
			return acc
		}, {})
}

let translations = getTranslations()
// NOTE: re-update `locals` if they were changed (in development)
if (process.env.NODE_ENV === 'development') {
	const watcher = chokidar.watch('locals/*.json')

	watcher.on('all', () => {
		translations = getTranslations()
	})
}

export const defaultLanguage = 'en'
export const supportedLanguages = ['en', 'ru']

export default (lang: string = defaultLanguage): i18nConfigObject => {
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
