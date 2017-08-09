import path from 'path'
import webpack from 'webpack'
// import _ from 'lodash'
import baseWebpackConfig from './webpack.base'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import {Plugin as ShakePlugin} from 'webpack-common-shake'
//
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
			warnings: false
			// This option removes console log in production
			// drop_console: true
		},
		output: {
			comments: false
		}
	})
]

// Do you want to use bundle analyzer?
if (ANALYZE_BUNDLE) {
	baseWebpackConfig.plugins.push(
		new BundleAnalyzerPlugin({analyzerMode: 'static'})
	)
}

export default Object.assign({}, baseWebpackConfig, {
	devtool: 'cheap-source-map',
	plugins: baseWebpackConfig.plugins.concat(plugins)
})
