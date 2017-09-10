/**
 * @flow
 * @file
 */
import express from 'express'
import spdy from 'spdy'
import chalk from 'chalk'
// 
import server from './server'
import {serverOptions as options} from './config'
const app: express$Application = express()
const PORT: number = +process.env.PORT || 3000

server(app)

spdy.createServer(options, app).listen(PORT, () => {
	console.log(chalk.green(`SERVER IS LISTENING ON ${PORT}`))
})
