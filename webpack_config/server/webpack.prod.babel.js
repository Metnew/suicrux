import webpack from 'webpack'
import baseWebpackConfig from './webpack.base'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import {Plugin as ShakePlugin} from 'webpack-common-shake'
import OptimizeJsPlugin from 'optimize-js-plugin'

const {ANALYZE_BUNDLE} = process.env
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
	})
]

// Do you want to use bundle analyzer?
if (ANALYZE_BUNDLE) {
	plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
}

export default Object.assign({}, baseWebpackConfig, {
	plugins: baseWebpackConfig.plugins.concat(plugins)
})
