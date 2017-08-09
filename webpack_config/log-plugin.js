import chalk from 'chalk'

// this plugin logs message after every compilation
export default class LogPlugin {
	constructor (port) {
		this.port = port
	}

	apply (compiler) {
		compiler.plugin('done', () => {
			console.log(
				`> App is running at ${chalk.yellow(`http://localhost:${this.port}`)}\n`
			)
		})
	}
}
