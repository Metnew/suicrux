import app from './express'
import useSSR from './ssr'
import chalk from 'chalk'

const {PORT} = process.env
// Add API route
// app.use(BASE_API, API)
// Add SSR handler
app.use(useSSR)
// Start server
app.listen(PORT, () => {
	console.log(chalk.magenta(`\nServer is running on ${PORT} port!\n`))
})
