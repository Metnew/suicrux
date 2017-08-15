import express from 'express'
import createServer from './server'
import chalk from 'chalk'

const app = express()
const PORT = process.env.PORT || 3000
// Decorate server with all middlewares/routes/extensions for production
createServer(app)
// Start server
app.listen(PORT, () => {
	console.log(chalk.green(`SERVER IS LISTENING ON ${PORT}`))
})
