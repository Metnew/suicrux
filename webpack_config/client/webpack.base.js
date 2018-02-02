const path = require('path')
const rimraf = require('rimraf')
const webpack = require('webpack')
const config = require('../config')
const isomorphicWebpackConfig = require('../webpack.isomorphic')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const {
	srcPath,
	publicPath,
	isProduction,
	title,
	manifest
} = config

rimraf(`${config.distPath}/client`, {}, () => {})

const definePluginArgs = {
	'process.env.BROWSER': JSON.stringify(true)
}

// use hash filename to support long-term caching in production
// NOTE: [chunkhash] leads to high memory consumption
const hints = isProduction ? 'warning' : false
const devtool = isProduction ? 'cheap-source-map' : 'eval'

const baseBuild = {
	devtool,
	entry: {
		client: path.join(srcPath, './client')
	},
	output: {
		publicPath,
		crossOriginLoading: 'anonymous'
	},
	performance: {
		hints
	},
	resolve: {
		alias: {
			...isomorphicWebpackConfig.resolve.alias
			// NOTE: Preact + preact-compat can save you 148Kb parsed or 14kb gzipped
			// Preact may breaks your React app, starter by default doesn't aim to support Preact
			// react: 'preact-compat',
			// 'react-dom': 'preact-compat',
			// 'preact-compat': 'preact-compat/dist/preact-compat'
		},
		modules: isomorphicWebpackConfig.resolve.modules
	},
	module: {
		rules: isomorphicWebpackConfig.module.rules
	},
	plugins: isomorphicWebpackConfig.plugins.concat([
		new webpack.DefinePlugin(definePluginArgs),
		new WebpackAssetsManifest({
			assets: config.manifest
		})
	])
}

module.exports = baseBuild
