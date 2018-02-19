/**
 * @file
 */
import webpack from 'webpack'
import DevServer from 'webpack-dev-server'
import printErrors from 'razzle-dev-utils/printErrors'
import config from './config'
import client from './client/webpack.dev.babel'
import server from './server/webpack.dev.babel'

const {DEV_SERVER_PORT} = config
const serverCompiler = compile(server)

// Start our server webpack instance in watch mode.
serverCompiler.watch(
	{
		quiet: false,
		stats: 'info'
	},
	/* eslint-disable no-unused-vars */
	stats => {}
)

// Compile our assets with webpack
const clientCompiler = compile(client)

// Create a new instance of Webpack-dev-server for our client assets.
// This will actually run on a different port than the users app.
const clientDevServer = new DevServer(clientCompiler, client.devServer)

// Start Webpack-dev-server
clientDevServer.listen(DEV_SERVER_PORT, err => {
	if (err) {
		console.error(err)
	}
})

// Webpack compile in a try-catch
function compile (config) {
	let compiler
	try {
		compiler = webpack(config)
	} catch (e) {
		printErrors('Failed to compile.', [e])
		process.exit(1)
	}
	return compiler
}
