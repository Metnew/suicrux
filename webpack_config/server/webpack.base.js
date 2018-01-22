const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const rimraf = require('rimraf')
const config = require('../config')
const isomorphicWebpackConfig = require('../webpack.isomorphic')
const {
	SENTRY_DSN,
	JWT_SECRET,
	PORT,
	publicPath,
	BASE_API_SSR,
	API_PREFIX,
	isProduction
} = config

// Clear dist dir before run
rimraf(`${config.distPath}/server`, {}, () => {})

const chunkFilename = isProduction ? '[name].[chunkhash:6].js' : '[name].js'
const devtool = isProduction ? 'cheap-source-map' : 'eval'
const entry = isProduction
	? path.join(config.srcPath, './server')
	: path.join(config.srcPath, './server/server')

const definePluginArgs = {
	'process.env.BROWSER': JSON.stringify(false),
	'process.env.PORT': JSON.stringify(PORT),
	'process.env.JWT_SECRET': JSON.stringify(JWT_SECRET),
	'process.env.SENTRY_DSN': JSON.stringify(SENTRY_DSN),
	'process.env.BASE_API': JSON.stringify(BASE_API_SSR),
	'process.env.API_PREFIX': JSON.stringify(API_PREFIX)
}

let nodeModules = {}
fs
	.readdirSync('node_modules')
	.filter(x => {
		return ['.bin'].indexOf(x) === -1
	})
	.forEach(mod => {
		nodeModules[mod] = 'commonjs ' + mod
	})

const baseWebpackConfig = {
	name: 'server',
	entry,
	devtool,
	target: 'node',
	output: {
		filename: 'index.js',
		chunkFilename,
		publicPath,
		// libraryTarget: 'commonjs2'
	},
	// externals: nodeModules,
	performance: {
		hints: false
	},
	resolve: {
		extensions: isomorphicWebpackConfig.resolve.extensions,
		modules: isomorphicWebpackConfig.resolve.modules,
		alias: {
			...isomorphicWebpackConfig.resolve.alias,
			locals: `${config.rootPath}/locals`
		}
	},
	module: {
		rules: isomorphicWebpackConfig.module.rules
	},
	plugins: isomorphicWebpackConfig.plugins.concat([
		new webpack.NormalModuleReplacementPlugin(
			/\.(css|sass|less|scss)$/,
			'node-noop'
		),
		new webpack.DefinePlugin(definePluginArgs)
	]),
	node: {
		__dirname: true,
		global: true
	}
}

module.exports = baseWebpackConfig
