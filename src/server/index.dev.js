/**
 * @flow
 * @file
 */
import express from 'express'
import http from 'http'
import spdy from 'spdy'
import chalk from 'chalk'
// Mount our server-side code to dev server
import server from '../../webpack_config/devServer'
import {serverOptions as options} from './config/index.dev'

const app: express$Application = express()
const httpsPORT: number = +process.env.PORT || 3000
const httpPort: number = +process.env.PORT || 3000 - 443

server(app)

spdy.createServer(options, app).listen(httpsPORT, () => {
	console.log(
		chalk.red(`HTTPS SERVER IS LISTENING ON https://127.0.0.1:${httpsPORT}`)
	)
})

http.createServer(app).listen(httpPort, () => {
	console.log(
		chalk.green(`HTTP SERVER IS LISTENING ON http://localhost:${httpPort}`)
	)
})
