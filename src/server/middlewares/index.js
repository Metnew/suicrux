/**
 * @file add global middlewares for app
 * @flow
 */
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import Raven from 'raven'
import authMiddleware from './auth'

export default (app: express$Application): express$Application => {
	// Must configure Raven before doing anything else with it
	Raven.config(process.env.SENTRY_DSN).install()
	// The request handler must be the first middleware on the app
	app.use(Raven.requestHandler())
	// remove x-powered-by
	app.disable('x-powered-by')
	// Add express stuff
	app.use(helmet())
	app.use(compression())
	app.use(morgan('dev'))
	app.use(cookieParser())
	app.use(
		express.static(process.env.CLIENT_DIST_PATH, {
			index: false
		})
	)
	app.use(bodyParser.json())
	app.use(authMiddleware)
	// The error handler must be before any other error middleware
	app.use(Raven.errorHandler())
	// Optional fallthrough error handler
	// eslint-disable-next-line
	app.use(function onError(
		err,
		req: express$Request,
		res: express$Response,
		next: express$NextFunction
	) {
		// NOTE: @Metnew: line disabled by ESlint, because err is already handled by sentry
		//
		// The error id is attached to `res.sentry` to be returned
		// and optionally displayed to the user for support.
		res.statusCode = 500
		res.end(res.sentry + '\n')
	})

	return app
}
