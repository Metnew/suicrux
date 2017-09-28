/**
 * @flow
 */
import chalk from 'chalk'
import jwt from 'jsonwebtoken'
import {supportedLanguages, defaultLanguage} from '../i18n'
import {JWT_TOKEN} from 'common/api/LocalStorageCookiesSvc'
/**
 * Auth-related middleware.
 * Checks that user is logged in and token is valid
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {Function} next
 */
export default (
	req: express$Request,
	res: express$Response,
	next: () => void
) => {
	const language: string = req.acceptsLanguages(supportedLanguages) || defaultLanguage
	req.user = {
		token: null,
		language,
		isLoggedIn: false
	}

	const token: string = req.cookies[JWT_TOKEN]
	if (!token) {
		return next()
	}

	console.log(chalk.blue('USER HAS JWT TOKEN'))
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			console.log(chalk.red('CANT DECODE JWT TOKEN!', err))
		} else {
			console.log(chalk.magenta('TOKEN SUCCESSFULLY DECODED'))
			// NOTE: set user language in jwt token that may helps handling i18n efficiently
			const {username} = decoded
			req.user = {
				token,
				username,
				isLoggedIn: true
			}
		}
		console.log(
			chalk.yellow(`USER IS LOGGED IN: ${req.user.isLoggedIn ? 'YES' : 'NO'}`)
		)
		next()
	})
}
