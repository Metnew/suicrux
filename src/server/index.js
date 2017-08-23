/**
 * @flow
 * @file
 */
import express from 'express'
import chalk from 'chalk'
// import serverDecorator from './server'
const app: any = express()
const PORT: number = process.env.PORT || 3000
const serverModulePath =
	process.env.NODE_ENV === 'production'
		? './server' // Decorate server with all middlewares/routes for production
		: '../../webpack_config/server' // Mount our server-side code to dev server

const createServer: Function = require(serverModulePath).default
createServer(app)

// Start server
app.listen(PORT, () => {
	console.log(chalk.green(`SERVER IS LISTENING ON ${PORT}`))
})
