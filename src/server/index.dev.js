/**
 * @flow
 * @file
 */
import express from 'express'
import chalk from 'chalk'
// Mount our server-side code to server
import server from '../../webpack_config/devServer'

const app: express$Application = express()
const port: number = +process.env.PORT || 3000

server(app)

app.listen(port, () => {
	console.log(
		chalk.green(`SERVER IS LISTENING ON http://localhost:${port}`)
	)
})
