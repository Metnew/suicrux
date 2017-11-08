/**
 * @file
 */
import webpack from 'webpack'
import chalk from 'chalk'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackGetCodeOnDone from 'webpack-get-code-on-done'
import config from './config'
import client from './client/webpack.dev.babel'
import server from './server/webpack.dev.babel'
// Webpack plugins
import LogPlugin from './assets/log-plugin'
import FriendlyErrors from 'friendly-errors-webpack-plugin'
// Configs for MultiCompiler
const webpackConfig = [client, server]
// Get MultiCompiler
const compiler = webpack(webpackConfig)
// Apply some commonly used plugins
compiler.apply(new FriendlyErrors())
compiler.apply(new LogPlugin(config.PORT))
compiler.apply(new webpack.NoEmitOnErrorsPlugin())
// Create devMiddleWare
const devMiddleWare = webpackDevMiddleware(compiler, {
	serverRenderer: true,
	publicPath: webpackConfig[0].output.publicPath,
	quiet: false,
	noInfo: true
})

// NOTE: Every time we apply our compiled code to development server
// We add new middlewares from new code, but don't remove old middlewares from old code

// Number of middlewares that our app should has
let prevSize = null
/**
 * @desc Adds dev middlewares + your code to an express server instance
 * @param {ExpressServer} app - Express dev server to which compiled code will be applied
 */
export default function (app) {
	/**
	 * @desc Function that executes after your server-side code compiles
	 * @param  {Function}  serverSideCode - compiled server-side code
	 */
	const done = serverSideCode => {
		// Get current stack of the app (e.g. applied middlewares)
		const {stack} = app._router
		const {length} = stack
		prevSize = prevSize || length
		if (length > prevSize) {
			// Remove old compiled code
			app._router.stack = stack.slice(0, prevSize)
		}
		if (!serverSideCode) {
			console.log(
				chalk.red(
					'Error: no "serverSideCode" got. Check latest changes.'
				)
			)
		} else {
			// Apply newly compiled code
			serverSideCode(app)
		}
	}

	app.use(devMiddleWare)
	app.use(
		webpackHotMiddleware(
			compiler.compilers.find(compiler => compiler.name === 'client'),
			{
				log: console.log
			}
		)
	)
	const serverCompiler = compiler.compilers.find(
		compiler => compiler.name === 'server'
	)
	webpackGetCodeOnDone(serverCompiler, done)
}
