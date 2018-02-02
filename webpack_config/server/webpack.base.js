const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const config = require('../config')
const isomorphicWebpackConfig = require('../webpack.isomorphic')
const {
	SENTRY_DSN,
	publicPath,
	isProduction
} = config

// Clear dist dir before run
rimraf(`${config.distPath}/server`, {}, () => {})

const chunkFilename = isProduction ? '[name].[chunkhash:6].js' : '[name].js'
const devtool = isProduction ? 'cheap-source-map' : 'eval'
const entry = path.join(config.srcPath, './server')

const definePluginArgs = {
	'process.env.BROWSER': JSON.stringify(false),
	'process.env.SENTRY_DSN': JSON.stringify(SENTRY_DSN)
}

const baseWebpackConfig = {
	name: 'server',
	entry,
	devtool,
	target: 'node',
	output: {
		filename: 'index.js',
		chunkFilename,
		publicPath
	},
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
