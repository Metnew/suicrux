'use strict'
import path from 'path'
import express from 'express'
import httpProxy from 'http-proxy'
import webpack from 'webpack'
import webpackConfig from './client/webpack.dev.babel'
import config from './config'
import LogPlugin from './log-plugin'
import open from 'open'

const apiProxy = httpProxy.createProxyServer()
const app = express()
const port = 3000

webpackConfig.entry.client = [
	'react-hot-loader/patch',
	'webpack-hot-middleware/client?reload=true',
	webpackConfig.entry.client
]

webpackConfig.plugins.push(new LogPlugin(port))

let compiler

try {
	compiler = webpack(webpackConfig)
} catch (err) {
	console.log(err.message)
	process.exit(1)
}

const devMiddleWare = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	// @Metnew: personally I prefer `quite: "true"`
	quiet: false,
	hot: true,
	inline: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': '*'
	}
})

app.use(devMiddleWare)
app.use(
	require('webpack-hot-middleware')(compiler, {
		log: console.log
	})
)

const mfs = devMiddleWare.fileSystem
const file = path.join(webpackConfig.output.path, 'index.html')

devMiddleWare.waitUntilValid()

app.get('*', (req, res) => {
	devMiddleWare.waitUntilValid(() => {
		const html = mfs.readFileSync(file)
		res.end(html)
	})
})

// Proxy api requests to BASE_API
app.use(config.BASE_API, function (req, res) {
	/**
   * // req.baseUrl - The URL path on which a router instance was mounted.
   * {@link https://expressjs.com/ru/4x/api.html#req.baseUrl}
   */
	req.url = req.baseUrl + req.url
	apiProxy.web(req, res, {
		target: {
			port: 4000,
			host: 'localhost'
		}
	})
})

app.listen(port)

open(`http://localhost:${port}`)
