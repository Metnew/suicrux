// @flow
import {supportedLanguages, defaultLanguage} from '../i18n'

export default (req, res, next) => {
	const language: string =
		req.acceptsLanguages(supportedLanguages) || defaultLanguage
	req.user = {
		language
	}
	next()
}
