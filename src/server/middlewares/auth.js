/**
 * @flow
 */
import chalk from 'chalk'
import jwt from 'jsonwebtoken'
import {JWT_TOKEN} from 'common/api/LocalStorageCookiesSvc'
/**
 * Auth-related middleware.
 * Checks that user is logged in and token is valid
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {Function} next
 */
export default (req: Object, res: Object, next: () => void) => {
	req.user = {
		token: null,
		lang: 'en',
		isLoggedIn: false
	}

	const token: string = req.cookies[JWT_TOKEN]
	if (!token) {
		return next()
	}

	console.log(chalk.blue('USER HAS TOKEN'))
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			console.log(chalk.red('CANT DECODE JWT TOKEN!', err))
		} else {
			console.log(chalk.magenta('TOKEN SUCCESSFULLY DECODED'))
			req.user = {
				...decoded,
				token,
				isLoggedIn: true
			}
		}
		console.log(
			chalk.yellow(`USER IS LOGGED IN: ${req.user.isLoggedIn ? 'YES' : 'NO'}`)
		)
		next()
	})
}
