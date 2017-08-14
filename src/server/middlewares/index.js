// Express-related stuff
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

export default function initGlobalMiddlewares () {
	const {DIST_PATH} = process.env
	// Add express stuff
	this.use(helmet())
	this.use(compression())
	this.use(morgan('dev'))
	this.use(cookieParser())
	this.use(
		express.static(DIST_PATH, {
			// Don't use index.html inside /dist dir
			index: false
		})
	)
	this.use(bodyParser.json())
	this.use(authMiddleware)
}
