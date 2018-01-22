const webpack = require('webpack')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const OptimizeJsPlugin = require('optimize-js-plugin')

const analyzePlugins = config.ANALYZE_BUNDLE
	? [new BundleAnalyzerPlugin({analyzerMode: 'static'})]
	: []
const plugins = [
	new webpack.ProgressPlugin(),
	new webpack.optimize.ModuleConcatenationPlugin(),
	// NOTE: you can use BabiliPlugin as an alternative to UglifyJSPlugin
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: true,
		compress: {
			warnings: false,
			unused: true,
			dead_code: true,
			// This option removes console.log in production
			drop_console: true
		},
		output: {
			comments: false
		}
	}),
	new OptimizeJsPlugin({
		sourceMap: true
	}),
	...analyzePlugins
]

module.exports = Object.assign({}, baseWebpackConfig, {
	plugins: baseWebpackConfig.plugins.concat(plugins)
})
