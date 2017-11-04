/**
 * @flow
 * @file
 */
import express from 'express'
import chalk from 'chalk'
// Mount our server-side code to server
import server from './server'

const app: express$Application = express()
const httpPORT: number = +process.env.HTTP_PORT

server(app)

app.listen(httpPORT, () => {
	console.log(
		chalk.green(`HTTP SERVER IS LISTENING ON http://localhost:${httpPORT}`)
	)
})
