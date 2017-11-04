import webpack from 'webpack'
import config from '../config'
import baseWebpackConfig from './webpack.base'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import OptimizeJsPlugin from 'optimize-js-plugin'

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

export default Object.assign({}, baseWebpackConfig, {
	plugins: baseWebpackConfig.plugins.concat(plugins)
})
