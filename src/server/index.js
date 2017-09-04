/**
 * @flow
 * @file
 */
import express from 'express'
import chalk from 'chalk'
const app: express$Application = express()
const PORT: number = +process.env.PORT || 3000
const serverModulePath: string =
	process.env.NODE_ENV === 'production'
		? './server' // Decorate server with all middlewares/routes for production
		: '../../webpack_config/server' // Mount our server-side code to dev server

const createServer: Function = require(serverModulePath).default
createServer(app)

// Start server
app.listen(PORT, () => {
	console.log(chalk.green(`SERVER IS LISTENING ON ${PORT}`))
})
