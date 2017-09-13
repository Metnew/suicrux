import webpack from 'webpack'
import baseWebpackConfig from './webpack.base'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import {Plugin as ShakePlugin} from 'webpack-common-shake'
import OptimizeJsPlugin from 'optimize-js-plugin'

const analyzePlugins = process.env.ANALYZE_BUNDLE
	? [new BundleAnalyzerPlugin({analyzerMode: 'static'})]
	: []
const plugins = [
	new webpack.ProgressPlugin(),
	new webpack.optimize.ModuleConcatenationPlugin(),
	new ShakePlugin(),
	// NOTE: you can use BabiliPlugin as an alternative to UglifyJSPlugin
	// new BabiliPlugin(),
	new UglifyJSPlugin({
		sourceMap: true,
		compress: {
			warnings: false,
			unused: true,
			dead_code: true
			// This option removes console.log in production
			// drop_console: true
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
