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
import jwt from 'jsonwebtoken'
import chalk from 'chalk'
import path from 'path'
import authMiddleware from './auth'
//
export default (app: Object) => {
	// Add express stuff
	app.use(helmet())
	app.use(compression())
	app.use(morgan('dev'))
	app.use(cookieParser())
	app.use(express.static(process.env.CLIENT_DIST_PATH, {
		index: false
	}))
	app.use(bodyParser.json())
	app.use(authMiddleware)

	return app
}
