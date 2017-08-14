'use strict'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotFullStack from 'webpack-hot-fullstack-middleware'
import WriteFilePlugin from 'write-file-webpack-plugin'
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
compiler.apply(new LogPlugin())
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
 * @desc Adds dev middlewares + your code to the instance of express server
 * @param {Function} app - Express dev server to which compiled code will be applied
 * @param {Function} wss - WebSocket server, allow you send event to client to re-render the page
 */
export default function (app, wss) {
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
		// Apply newly compiled code
		serverSideCode(app)
		// wss.on('connection', (ws, req) => {
		// 	console.log('FIRE', req.url)
		// 	ws.send('reload')
		// })
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
	webpackHotFullStack({compiler, done})
}
