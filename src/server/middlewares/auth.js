// Application-related stuff
import chalk from 'chalk'
import jwt from 'jsonwebtoken'
import {JWT_TOKEN} from 'common/api'
// Auth-related middleware, check that user is logged in and token is valid
export default (req, res, next) => {
	const {JWT_SECRET} = process.env
	req.user = {}
	const token = req.cookies[JWT_TOKEN]
	if (!token) {
		return next()
	}

	console.log(chalk.blue('USER HAS TOKEN'))
	jwt.verify(token, JWT_SECRET, (err, decoded) => {
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
