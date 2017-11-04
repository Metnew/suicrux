// @flow
import {Router} from 'express'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'
const router: express$Router = Router()

router.post('/', (req: express$Request, res: express$Response) => {
	// NOTE: if user is already logged in, but wants to change language
	// we have to update his JWT token
	const data = {username: 'cool_username_for_testing'}
	const jwtOptions = {expiresIn: '7d'}
	jwt.sign(data, process.env.JWT_SECRET, jwtOptions, (err, token) => {
		if (err) {
			throw new Error(
				`Cant create JWT token based on input data: ${JSON.stringify(data)}`,
				err
			)
		}
		console.log(chalk.yellow(`Generated token for user: ${data.username}`))
		res.json({token})
	})
})

export default router
