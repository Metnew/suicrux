/**
 * @flow
 * @file
 */
import express from 'express'
import http from 'http'
import spdy from 'spdy'
import chalk from 'chalk'
// Mount our server-side code to server
import server from './server'
import {serverOptions as options} from './config'

const app: express$Application = express()
const httpsPORT: number = +process.env.PORT || 3030
const httpPORT: number = +process.env.PORT || 3000

server(app)

spdy.createServer(options, app).listen(httpsPORT, () => {
	console.log(
		chalk.red(`HTTPS SERVER IS LISTENING ON https://127.0.0.1:${httpsPORT}`)
	)
})

http.createServer(app).listen(httpPORT, () => {
	console.log(
		chalk.green(`HTTP SERVER IS LISTENING ON http://localhost:${httpPORT}`)
	)
})
