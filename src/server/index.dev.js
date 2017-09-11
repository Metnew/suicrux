/**
 * @flow
 * @file
 */
import express from 'express'
import spdy from 'spdy'
import chalk from 'chalk'
// Mount our server-side code to dev server
import server from '../../webpack_config/server'
import {serverOptions as options} from './config/index.dev'

const app: express$Application = express()
const PORT: number = +process.env.PORT || 3000

server(app)

spdy.createServer(options, app).listen(PORT, () => {
	console.log(chalk.green(`SERVER IS LISTENING ON ${PORT}`))
})
